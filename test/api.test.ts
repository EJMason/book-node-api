import supertest from 'supertest';
import app from '../dist/App';

const request = supertest(app);

describe('POST - /api/v1/books', () => {
  it('should return 200 OK', () => {
    return request
      .post('/api/v1/books')
      .send({ author: 'Manny Fanny', title: 'Cat in the Hat' })
      .expect(200);
  });

  it('should return 400 when body is incorrect format', () => {
    return request
      .post('/api/v1/books')
      .send({ author: 5, title: 'Cat in the Hat' })
      .expect(400);
  });
});

describe('POST - /api/v1/users', () => {
  xit('should return 200 OK', () => {
    return request.post('/api/v1/users').expect(200, 'User Created');
  });
});

xdescribe('PUT - /api/v1/:userid/books/read', () => {
  it('should return 200 OK', () => {
    return request.put('/api/v1/users/:userid/books/read').expect(200);
  });
});

xdescribe('DEL - /api/v1/:userid/books/read', () => {
  it('should return 200 OK', () => {
    return request.delete('/api/v1/users/:userid/books/read').expect(200);
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
