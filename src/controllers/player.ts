import fs from 'fs/promises';
import { PlayerTypes } from '../Interfaces/Argentinian.player.js';
import importData from '../data/data.json' assert { type: 'json' };
import { NextFunction, Request, Response } from 'express';

async () => {
    const file = '../data/data.json';
    const data = await fs.readFile(file);
    const info = 'Argentinian Player';
    console.log(data.toLocaleString());
};

let data: Array<PlayerTypes> = importData.argentinianPlayer;

export class PlayerController {
    getAll(req: Request, resp: Response) {
        resp.json(data);
        resp.end();
    }

    post(req: Request, resp: Response) {
        const newPlayer = {
            ...req.body,
            id: data.length + 1,
        };
        data.push(newPlayer);
        resp.json(newPlayer);
        resp.end();
    }

    patch(req: Request, resp: Response) {
        const updatePlayer = {
            ...data.find((item) => item.id === +req.params.id),
            ...req.body,
        };
        data[data.findIndex((item) => item.id === +req.params.id)] =
            updatePlayer;
        resp.json(updatePlayer);
        resp.end();
    }

    delete(req: Request, resp: Response, next: NextFunction) {
        if (!data.find((item) => item.id === +req.params.id)) {
            next(new Error('Not found'));
            return;
        }
        data = data.filter((item) => item.id !== +req.params.id);
        resp.json({});
        resp.end();
    }
}
