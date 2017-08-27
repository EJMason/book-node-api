import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import config from 'my.config';
import log from 'my.logger';

import app from './appInstance';

// load env variables
dotenv.config(); // do I need the example here?

//  Middlewares //
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ---------- VERSIONING ----------------- //
app.use('/v1', express.Router());

app.get('/', (req, res) => {
  res.status(200).send('hi');
});

app.listen(config.PORT, () => {
  console.log(
    'App is running at http://localhost:%d in %s mode',
    config.PORT,
    config.nodeEnv
  );
  console.log('-->Press CTRL-C to stop.\n');
});
