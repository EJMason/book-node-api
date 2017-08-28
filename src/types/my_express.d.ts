import * as expressT from 'express';

declare namespace my_express {
  interface Application extends expressT.Application {}
  interface NextFunction extends expressT.NextFunction {}

  interface Request extends expressT.Request {}

  interface Response extends expressT.Request {}
}

export as namespace my_express;
export = my_express;
