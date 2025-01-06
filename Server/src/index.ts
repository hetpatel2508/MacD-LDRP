import express, { Request, Response, Express } from 'express';
import 'dotenv/config';
import rootRouter from './routes';
import { errorMiddleware } from './middlewares/errors';
import cors from 'cors';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', rootRouter);
app.use(errorMiddleware);

app.use(
  cors({
    origin: 'http://localhost:5173', // Adjust as needed for your frontend domain
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }),
);

app.listen(process.env.PORT, () => {
  console.log('Example app listening on port ' + process.env.PORT + '!');
});
