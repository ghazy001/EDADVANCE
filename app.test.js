const request = require('supertest');
const app = require('./app');
const passport = require('./config/passport');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { summarizeText } = require('./controller/summarizer.js');
const generateZoomMeeting = require('./zoom.service');

jest.mock('./config/passport');
jest.mock('axios');
jest.mock('fs');
jest.mock('path');
jest.mock('./controller/summarizer.js');
jest.mock('./zoom.service');

describe('Express App', () => {
  let mockUser = { id: '123', email: 'test@example.com' };

  beforeEach(() => {
    passport.authenticate.mockReturnValue((req, res, next) => next());
    process.env.FRONTEND_URL = 'http://localhost:5173';
    process.env.NODE_ENV = 'test';
    process.env.SESSION_SECRET = 'test-secret';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test authentication routes
  it('should redirect to Google OAuth', async () => {
    const response = await request(app).get('/auth/google');
    expect(response.status).toBe(302); // Redirect status
  });

  it('should handle Google callback', async () => {
    const response = await request(app).get('/auth/google/callback');
    expect(response.status).toBe(302);
    expect(response.headers.location).toBe('http://localhost:5173/courses');
  });

  it('should handle GitHub callback', async () => {
    const response = await request(app).get('/auth/github/callback');
    expect(response.status).toBe(302);
    expect(response.headers.location).toBe('http://localhost:5173/courses');
  });

  // Test current user route
  it('should return current user when authenticated', async () => {
    const req = { user: mockUser };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    await request(app).get('/auth/current_user').set('Accept', 'application/json');
    expect(res.status).not.toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(mockUser);
  });

  it('should return 401 when not authenticated', async () => {
    const response = await request(app).get('/auth/current_user');
    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'Not authenticated' });
  });

  // Test session route
  it('should return session info when authenticated', async () => {
    const req = { user: mockUser };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    await request(app).get('/api/test-session').set('Accept', 'application/json');
    expect(res.status).not.toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Session active', user: mockUser });
  });

  // Test GitHub repos route
  it('should fetch GitHub repos with valid token', async () => {
    axios.get.mockResolvedValue({ data: [{ name: 'test-repo', language: 'JavaScript' }] });
    const response = await request(app)
      .get('/github/repos')
      .set('github-token', 'test-token')
      .set('Accept', 'application/json');
    expect(response.status).toBe(200);
    expect(response.body.data).toEqual([{ name: 'test-repo', language: 'JavaScript' }]);
  });

  it('should return 401 without user', async () => {
    const response = await request(app).get('/github/repos');
    expect(response.status).toBe(401);
  });

  // Test courses by repo language
  it('should fetch courses by repo language', async () => {
    axios.get.mockResolvedValueOnce({ data: [{ name: 'test-repo', language: 'JavaScript', owner: { login: 'test-user' } }] });
    const response = await request(app)
      .get('/github/courses-by-repo-language/test-repo')
      .set('github-token', 'test-token')
      .set('Accept', 'application/json');
    expect(response.status).toBe(200);
  });

  // Test Zoom meeting route
  it('should create a Zoom meeting', async () => {
    generateZoomMeeting.mockResolvedValue({ join_url: 'http://zoom.test', id: '123', password: 'pass' });
    const response = await request(app)
      .post('/api/zoom/meeting')
      .set('Accept', 'application/json')
      .send({ courseId: '456' });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ join_url: 'http://zoom.test', meeting_id: '123', password: 'pass' });
  });

  it('should return 401 for Zoom without auth', async () => {
    const response = await request(app).post('/api/zoom/meeting');
    expect(response.status).toBe(401);
  });

  // Test terms page
  it('should serve terms page', async () => {
    const response = await request(app).get('/terms');
    expect(response.status).toBe(200);
    expect(response.text).toContain('Conditions de service');
  });

  // Test file upload and summarization
  it('should summarize uploaded PDF', async () => {
    fs.promises.readFile.mockResolvedValue(Buffer.from('PDF content'));
    summarizeText.mockResolvedValue('Summary text');
    const response = await request(app)
      .post('/upload')
      .attach('file', Buffer.from('PDF content'), { filename: 'test.pdf', contentType: 'application/pdf' });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ summary: 'Summary text' });
  });

  // Test text summarization
  it('should summarize plain text', async () => {
    summarizeText.mockResolvedValue('Summary text');
    const response = await request(app)
      .post('/summarize-text')
      .send({ text: 'Sample text to summarize' })
      .set('Accept', 'application/json');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ summary: 'Summary text' });
  });

  it('should return 400 for empty text summarization', async () => {
    const response = await request(app)
      .post('/summarize-text')
      .send({ text: '' })
      .set('Accept', 'application/json');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Text is required for summarization' });
  });
});

