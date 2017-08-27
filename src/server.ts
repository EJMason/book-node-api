import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as config from 'my.config';
import * as log from 'my.logger';

import app from './appInstance';
import v1 from './routes/v1';

//  Middlewares //
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ---------- VERSIONING ----------------- //
app.use('/v1', v1);

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
