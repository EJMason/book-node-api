import winston from 'winston';

import * as chalk from 'chalk';

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// Added in Node.js v1.4.1, this is a global event handler that will be notified of
// Promise values that do not have a .catch() handler (or some kind) attached to them.
// --
// NOTE: Some 3rd-party Promise libraries like Bluebird and Q will catch unhandled
// rejections and emit an "unhandledRejection" event on the global process object.
process.on('unhandledRejection', function handleWarning(reason, promise) {
  console.log(chalk.magenta.bold('[PROCESS] Unhandled Promise Rejection'));
  console.log(chalk.blue.bold('- - - - - - - - - - - - - - - - - - -'));
  console.log(reason);
  console.log(chalk.red.bold('- -'));
});

// // Now, let's create a Promise chain that has no error handling.
// Promise
//   .resolve( "I can haz fulfillment?!" )
//   .then(
//       function( value ) {

//           throw( new Error( "Something went wrong." ) );

//       }
//   )
// ;

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

  public clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
      winston.verbose('Internal Server Error ', req.xhr);
      res.status(500).send({ error: 'Something failed!' });
    } else {
      res.status(400).send({ error: 'Oops...' });
      // next(err);
    }
  }
}

const errorHandler = new Errors();
export default errorHandler;
