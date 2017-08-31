// import os = require('os');
// import fs = require('fs');
// import * as pgMonitor from 'pg-monitor';
// import { IOptions } from 'pg-promise';

// pgMonitor.setTheme('matrix'); // changing the default theme;

// // const $DEV = process.env.NODE_ENV === 'development';

// // Log file for database-related errors:
// const logFile = './db/errors.log';
// pgMonitor.setLog((msg, info) => {
//   if (info.event === 'error') {
//     let logText = os.EOL + msg; // line break + next error message;
//     if (info.time) {
//       // If it is a new error being reported,
//       // and not an additional error line;
//       logText = os.EOL + logText; // add another line break in front;
//     }
//     fs.appendFileSync(logFile, logText); // add error handling as required;
//   }

// //   if (false) {
// //     // If it is not a DEV environment:
// //     info.display = false; // display nothing;
// //   }
// // });

// export = {
//   // Monitor initialization function;
//   init: (options: IOptions<any>) => {
//     if (true) {
//       // In a DEV environment, we attach to all supported events:
//       pgMonitor.attach(options);
//     }
//     // } else {

//     //     pgMonitor.attach(options, ['error']);
//     // }
//   }
// };
