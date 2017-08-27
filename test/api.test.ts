import supertest from 'supertest';
import app from '../dist/server';

const request = supertest(app);

describe('GET /v1/books', () => {
  it('should return 200 OK', () => {
    return request.get('/v1/books').expect(200);
  });
});
