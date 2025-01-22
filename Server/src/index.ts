import express, { Request, Response, Express } from 'express';
import 'dotenv/config';
import rootRouter from './routes';
import { errorMiddleware } from './middlewares/errors';
import cors from 'cors';
import { getOrderNumber } from './controllers/order';
import { initializeSocketIO } from './socket-setup/socket-io';

const app: Express = express();

const server = app.listen(process.env.PORT, () => {
  console.log('Example app listening on port ' + process.env.PORT + '!');
});

const io = initializeSocketIO(server);

app.set('socketio', io);

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
  