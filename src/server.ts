import dotenv from 'dotenv';
import express from 'express';
import config from 'my/config';

import app from './appInstance';

// load env variables
dotenv.config(); // do I need the example here?

app.get('/', (req, res) => {
  res.status(200).send('hi');
});

app.listen(config.PORT, () => {
  console.log(
    'App is running at http://localhost:%d in %s mode',
    app.get('port'),
    app.get('env')
  );
  console.log('-->Press CTRL-C to stop.\n');
});

export default app;
