const request = require('supertest');
const app = require('./app'); // Make sure this path is correct

describe('App Routes', () => {
  it('GET /terms should return terms of service page', (done) => {
    request(app)
      .get('/terms')
      .expect(200)
      .expect((res) => {
        expect(res.text).toContain('Conditions de service');
      })
      .end(done);
  });

  it('GET /auth/current_user should return 401 if not authenticated', (done) => {
    request(app)
      .get('/auth/current_user')
      .expect(401)
      .expect((res) => {
        expect(res.body.message).toBe('Not authenticated');
      })
      .end(done);
  });

  it('POST /summarize-text should return summary of valid input', (done) => {
    request(app)
      .post('/summarize-text')
      .send({ text: 'Node.js is a JavaScript runtime built on Chrome\'s V8 engine.' })
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('summary');
      })
      .end(done);
  });

  it('POST /summarize-text should return 400 on empty input', (done) => {
    request(app)
      .post('/summarize-text')
      .send({ text: '' })
      .expect(400)
      .expect((res) => {
        expect(res.body).toHaveProperty('error');
      })
      .end(done);
  });
});
