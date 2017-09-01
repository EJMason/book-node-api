import * as chalk from 'chalk';
import { logger } from './api/users';

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
// THIS GOES OFF IN PRODUCTION

process.on('unhandledRejection', function handleWarning(reason, promise) {
  console.log(chalk.magenta.bold('[PROCESS] Unhandled Promise Rejection'));
  console.log(chalk.blue.bold('- - - - - - - - - - - - - - - - - - -'));
  console.log(reason);
  console.log(chalk.red.bold('- -'));
});

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
    logger.verbose(chalk.magenta('Route: '),  req.route);
    logger.verbose(chalk.magenta('Path: '),  req.path);
    logger.verbose(chalk.magenta('Body: '),   JSON.stringify(req.body));
    logger.verbose(chalk.magenta('Params: '), JSON.stringify(req.params));

    if (req.xhr) {
      logger.error('Internal Server Error ', req.xhr);
      res.status(500).send({ error: 'Something failed!' });
    } else {
      res.status(400).json({ error: 'Oops..., an error occured' });
      // next(err);
    }
  }
}

const errorHandler = new Errors();
export default errorHandler;
