import { NextFunction, Request, Response } from 'express';

import { HTTPError } from '../interfaces/error.js';
import { PlayerSpainTypes } from '../interfaces/spain.Player.js';
import { Data } from '../repository/repository.js';

export class PlayerSpainController {
    constructor(public dataModel: Data<PlayerSpainTypes>) {}
    async getAll(req: Request, resp: Response, next: NextFunction) {
        try {
            const data = await this.dataModel.getAll();
            resp.json(data);
        } catch (error) {
            const httpError = new HTTPError(
                503,
                'Service unavailable',
                (error as Error).message
            );
            next(httpError);
            return;
        }
    }

    async get(req: Request, resp: Response, next: NextFunction) {
        try {
            const data = await this.dataModel.get(+req.params.id);
            resp.json(data);
        } catch (error) {
            next(this.#createHttpError(error as Error));
            return;
        }
    }

    async post(req: Request, resp: Response, next: NextFunction) {
        if (!req.body.title) {
            const httpError = new HTTPError(
                406,
                'Not Acceptable',
                'Title not included in the data'
            );
            next(httpError);
            return;
        }
        try {
            const newTask = await this.dataModel.post(req.body);
            resp.json(newTask).end();
        } catch (error) {
            const httpError = new HTTPError(
                503,
                'Service unavailable',
                (error as Error).message
            );
            next(httpError);
            return;
        }
    }

    async patch(req: Request, resp: Response, next: NextFunction) {
        try {
            const updateTask = await this.dataModel.patch(
                +req.params.id,
                req.body
            );
            resp.json(updateTask).end();
        } catch (error) {
            next(this.#createHttpError(error as Error));
            return;
        }
    }

    async delete(req: Request, resp: Response, next: NextFunction) {
        try {
            await this.dataModel.delete(+req.params.id);
            resp.json({}).end();
        } catch (error) {
            next(this.#createHttpError(error as Error));
            return;
        }
    }

    #createHttpError(error: Error) {
        if ((error as Error).message === 'Not found id') {
            const httpError = new HTTPError(
                404,
                'Not Found',
                (error as Error).message
            );
            return httpError;
        }
        const httpError = new HTTPError(
            503,
            'Service unavailable',
            (error as Error).message
        );
        return httpError;
    }
}
