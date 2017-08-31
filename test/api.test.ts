import supertest from 'supertest';
import app from '../dist/App';

const request = supertest(app);

describe('POST /users with valid data', () => {
  it('should return 200 OK', done => {
    request.post('/api/v1/users').send({ user_name: 'ejmason24' }).expect(200);
    // .then(rtn => {
    //   expect(rtn).toHaveProperty('data');
    //   expect(rtn.data).toHaveLength;
    //   expect(rtn.data[0]).toHaveProperty('id');
    //   expect(rtn.data).toHaveProperty('username');
    done();
    // });
  });
});

xdescribe('POST /users with invalid data', () => {
  it('should return  400', () => {
    return request.post('/api/v1/users').send({}).expect(400);
  });
});

xdescribe('POST /users trying to add duplicate', () => {
  it('should return  400', () => {
    return request
      .post('/api/v1/users')
      .send({ user_name: 'ejmason24' })
      .expect(400);
  });
});

xdescribe('POST - /api/v1/books', () => {
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

xdescribe('PUT - /api/v1/:userid/books/read', () => {
  it('should return 200 OK', () => {
    return request.put('/api/v1/users/userid/books/read').expect(200);
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
