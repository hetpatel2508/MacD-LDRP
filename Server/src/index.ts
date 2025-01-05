import express, { Request, Response, Express } from 'express';
import 'dotenv/config';
import rootRouter from './routes';
import { errorMiddleware } from './middlewares/errors';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', rootRouter);
app.use(errorMiddleware);


app.listen(process.env.PORT, () => {
  console.log('Example app listening on port ' + process.env.PORT + '!');
});
