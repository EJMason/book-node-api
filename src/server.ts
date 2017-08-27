import * as dotenv from 'dotenv';
import * as express from 'express';
import * as config from 'my/config';

import app from './appInstance';

// load env variables
dotenv.config(); // do I need the example here?

app.get('/', (req, res) => {
  res.status(200).send('hello');
});

app.listen(config.PORT, () => {
  console.log(
    'App is running at http://localhost:%d in %s mode',
    app.get('port'),
    app.get('env')
  );
  console.log('  Press CTRL-C to stop\n');
});

export default app;
