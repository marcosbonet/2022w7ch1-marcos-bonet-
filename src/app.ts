import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { playerRouter } from './router/player.js';

export const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.get(
    '/',
    (_req: any, resp: { send: (arg0: string) => void; end: () => void }) => {
        resp.send('Hello word');
        resp.end();
    }
);

app.use('/argentinianPlayer', playerRouter);

app.use((error: Error, _req: Request, resp: Response, next: NextFunction) => {
    console.log(error.message);
    let status = 500;
    if (error.name === 'ValidationError') {
        status = 406;
    } else {
        //
    }
    resp.status(status);
    const result = {
        status: status,
        type: error.name,
        error: error.message,
    };
    resp.json(result);
    resp.end();
});
