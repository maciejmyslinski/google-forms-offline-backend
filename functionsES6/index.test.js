import request from 'supertest';
import app from './';

it('should return 200', async () => {
  const response = await request(app).post('/v1/form-description');
  expect(response.statusCode).toBe(200);
});
