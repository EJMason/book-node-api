import supertest from 'supertest';
import app from '../dist/server';

const request = supertest(app);

describe('GET - /v1', () => {
  it('should return 200 OK', () => {
    return request.get('/v1').expect(200);
  });
});

describe('POST - /api/v1/books', () => {
  it('should return 200 OK', () => {});
});

describe('POST - /api/v1/users', () => {
  it('should return 200 OK', () => {});
});

describe('PUT - /api/v1/:userid/books/read', () => {
  it('should return 200 OK', () => {});
});

describe('DEL - /api/v1/:userid/books/read', () => {
  it('should return 200 OK', () => {});
});

describe('PUT - /api/v1/:userid/books', () => {
  it('should return 200 OK', () => {});
});

describe('DEL - /api/v1/:userid/books', () => {
  it('should return 200 OK', () => {});
});

describe('GET - /api/v1/:userid/books', () => {
  it('should return 200 OK', () => {});
});
