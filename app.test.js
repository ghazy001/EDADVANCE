// app.test.js
const request = require('supertest');
const app = require('./app'); // Ensure app.js exports the Express instance

describe('App Routes', () => {
  it('GET /terms should return terms of service page', async () => {
    const res = await request(app).get('/terms');
    expect(res.statusCode).toBe(200);
    expect(res.text).toMatch(/Conditions de service/i);
  });

  it('GET /auth/current_user should return 401 if not authenticated', async () => {
    const res = await request(app).get('/auth/current_user');
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('message', 'Not authenticated');
  });

  it('POST /summarize-text should return summary of valid input', async () => {
    const res = await request(app)
      .post('/summarize-text')
      .send({ text: "Node.js is a JavaScript runtime built on Chrome's V8 engine." })
      .set('Accept', 'application/json');
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('summary');
  });

  it('POST /summarize-text should return 400 on empty input', async () => {
    const res = await request(app)
      .post('/summarize-text')
      .send({ text: '' })
      .set('Accept', 'application/json');

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});
