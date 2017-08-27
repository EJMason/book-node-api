import supertest from 'supertest';
import app from '../src/server';

const request = supertest('http://localhost:8000');

describe('GET /books', () => {
  it('should return 200 OK', () => {
    request.get('/v1/books').expect(200);
  });
});
