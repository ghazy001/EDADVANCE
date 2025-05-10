const request = require('supertest');
const app = require('./app'); // Ensure this path points to your app.js file

describe('App Routes', () => {
  it('GET /terms should return terms of service page', async () => {
    // Send GET request to /terms route
    const res = await request(app).get('/terms');
    
    // Assert status code and content
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('Conditions de service');
  });
});
