import winston from 'winston';

// interface HttpError {
//   status: number;
//   message: string;
//   code: number;
//   link: string;
// }

class Errors {
  private codes: Array<string>;
  constructor() {
    this.codes = ['200'];
  }

  // private errorTemplate(error): HttpError {

  // }

  public clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
      winston.verbose('Internal Server Error ', req.xhr);
      res.status(500).send({ error: 'Something failed!' });
    } else {
      next(err);
    }
  }
}

const errorHandler = new Errors();
export default errorHandler;
