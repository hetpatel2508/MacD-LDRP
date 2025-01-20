import express, { Request, Response, Express } from 'express';
import 'dotenv/config';
import rootRouter from './routes';
import { errorMiddleware } from './middlewares/errors';
import cors from 'cors';
import { getOrderNumber } from './controllers/order';

const app: Express = express();

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', rootRouter);
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log('Example app listening on port ' + process.env.PORT + '!');
});
