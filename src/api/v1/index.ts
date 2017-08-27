import * as express from 'express';
import * as app from '../../appInstance';
import { routers } from './routes';

const v1 = express.Router();

v1.use('/books', routers.books);
v1.use('/users', routers.users);

export default v1;
