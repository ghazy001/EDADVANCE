// app.test.js
const request = require('supertest');
const app = require('./app'); // Adjust path if needed

describe('App Routes', () => {
  it('GET /terms should return terms of service page', async () => {
    const res = await request(app).get('/terms');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('Conditions de service');
  });

  it('GET /auth/current_user should return 401 if not authenticated', async () => {
    const res = await request(app).get('/auth/current_user');
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Not authenticated');
  });

  it('POST /summarize-text should return summary of valid input', async () => {
    const res = await request(app)
      .post('/summarize-text')
      .send({ text: 'Node.js is a JavaScript runtime built on Chrome\'s V8 engine.' });
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('summary');
  });

  it('POST /summarize-text should return 400 on empty input', async () => {
    const res = await request(app).post('/summarize-text').send({ text: '' });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});
