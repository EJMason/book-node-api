import * as expressT from 'express';

interface Bod {
  title: string;
  author: string;
}

declare namespace myExpress {
  interface Application extends expressT.Application {}
  interface Router extends expressT.Router {}
  interface NextFunction extends expressT.NextFunction {}

  interface BookRequest extends expressT.Request {
    body: Body;
  }

  interface Response extends expressT.Request {}

  interface RequestHandler extends expressT.RequestHandler {}
}

export as namespace my_express;
export = myExpress;
