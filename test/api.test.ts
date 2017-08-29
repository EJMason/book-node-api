import supertest from 'supertest';
import app from '../dist/App';

const request = supertest(app);

describe('GET - /', () => {
  it('should return 200 OK', () => {
    return request.get('/').expect(200);
  });
});

describe('GET - /users', () => {
  it('should return 200 OK', () => {
    return request.get('/users').expect(200, '123');
  });
});

xdescribe('POST - /api/v1/books', () => {
  it('should return 200 OK', () => {
    return request.get('/books').expect(200);
  });
});

xdescribe('POST - /api/v1/users', () => {
  it('should return 200 OK', () => {
    return request.post('/api/v1/users').expect(200, 'postBooks');
  });
});

xdescribe('PUT - /api/v1/:userid/books/read', () => {
  it('should return 200 OK', () => {
    return request.put('/api/v1/:userid/books/read').expect(200);
  });
});

xdescribe('DEL - /api/v1/:userid/books/read', () => {
  it('should return 200 OK', () => {
    return request.delete('/api/v1/:userid/books/read').expect(200);
  });
});

xdescribe('PUT - /api/v1/:userid/books', () => {
  it('should return 200 OK', () => {
    return request.put('/api/v1/:userid/books').expect(200);
  });
});

xdescribe('DEL - /api/v1/:userid/books', () => {
  it('should return 200 OK', () => {
    return request.delete('/api/v1/:userid/books').expect(200);
  });
});

xdescribe('GET - /api/v1/:userid/books', () => {
  it('should return 200 OK', () => {
    return request.get('/api/v1/:userid/books').expect(200);
  });
});
