import * as http from 'http';
import app from './App';
import config from './util/config';

const server = http.createServer(app);
const port = ensurePort(config.port);

app.set('port', port ? port : 8080);

server.listen(port);
server.on('error', onError);

server.on('listening', () => {
  const addr = server.address();
  const uri = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`Server listening on ${uri}`);
});

/*
  * usually I put this kind of stuff in a utilities folder, but didn't want
  * to make you dig around from folder to folder. If there looks like a comment
  * with a file path, that means I would separate the logic elsewhere.
*/
// !/utilities/server.utilities.ts
function ensurePort(_port: number | string | undefined): number | boolean {
  const port: any = typeof _port === 'string' ? parseInt(_port, 10) : _port;
  if (isNaN(port)) {
    process.exit(1);
    return false;
  } else if (port >= 0) return port;
  else return false;
}

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') throw error;
  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  if (error.code == 'EACCES') {
    console.error(`${bind} requires elevated privileges`);
    process.exit(1);
  }
  if (error.code == 'EADDRINUSE') {
    console.error(`${bind} is already in use`);
    process.exit(1);
  }

  throw error;
}
