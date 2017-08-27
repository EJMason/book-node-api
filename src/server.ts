import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import my from 'my.config';

import app from './appInstance';

// load env variables
dotenv.config(); // do I need the example here?

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
