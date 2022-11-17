import { NextFunction, Request, Response } from 'express';
import { PlayerTypes } from '../interfaces/argentinian.Player.js';

import { HTTPError } from '../interfaces/error.js';
import { Data } from '../repository/repository.js';

export class PlayerController {
    constructor(public dataModel: Data<PlayerTypes>) {}
    async getAll(req: Request, resp: Response, next: NextFunction) {
        try {
            const data = await this.dataModel.getAll();
            resp.json({ data });
        } catch (error) {
            const httpError = new HTTPError(
                503,
                'Service unavailable',
                (error as Error).message
            );
            next(httpError);
        }
    }

    async get(req: Request, resp: Response, next: NextFunction) {
        try {
            const data = await this.dataModel.get(req.params.id);
            resp.json({ data });
        } catch (error) {
            next(this.#createHttpError(error as Error));
        }
    }

    async post(req: Request, resp: Response, next: NextFunction) {
        try {
            const player = await this.dataModel.post(req.body);
            resp.json({ player });
        } catch (error) {
            const httpError = new HTTPError(
                503,
                'Service unavailable',
                (error as Error).message
            );
            next(httpError);
        }
    }

    async patch(req: Request, resp: Response, next: NextFunction) {
        try {
            const player = await this.dataModel.patch(req.params.id, req.body);
            resp.json({ player });
        } catch (error) {
            next(this.#createHttpError(error as Error));
        }
    }

    async delete(req: Request, resp: Response, next: NextFunction) {
        try {
            await this.dataModel.delete(req.params.id);
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
