import * as chalk from 'chalk';
import config from './util/config';
import * as winston from 'winston';

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
// THIS GOES OFF IN PRODUCTION

export const logger = new winston.Logger({
  level: config.is_prod ? 'error' : 'debug',
  transports: [
    new winston.transports.Console({
      colorize: 'all',
      // json: true
    })
  ]
});

process.on('unhandledRejection', function handleWarning(reason, promise) {
  logger.debug(chalk.magenta.bold('[PROCESS] Unhandled Promise Rejection'));
  logger.debug(chalk.blue.bold('- - - - - - - - - - - - - - - - - - -'));
  logger.debug(reason);
  logger.debug(chalk.red.bold('- -'));
});

// interface HttpError {
//   status: number;
//   message: string;
//   code: number;
//   link: string;
// }
if (process.env.NODE_ENV !== 'production') {
  winston.handleExceptions(
    new winston.transports.Console({ colorize: true, json: true })
  );

}

class Errors {
  private codes: Array<string>;
  constructor() {
    this.codes = ['200'];
  }

  public clientErrorHandler(err, req, res, next) {
    logger.verbose(chalk.red('ERROR...'));
    logger.verbose(chalk.magenta('Route: '),  req.route);
    logger.verbose(chalk.magenta('Path: '),  req.path);
    logger.verbose(chalk.magenta('Body: '),   JSON.stringify(req.body));
    logger.verbose(chalk.magenta('Params: '), JSON.stringify(req.params));

    if (req.xhr) {
      logger.error('Internal Server Error ', JSON.stringify(req.xhr));
      res.status(500).send({ error: 'Something failed!' });
    } else {
      next(err);
    }
  }
}

const errorHandler = new Errors();
export default errorHandler;
