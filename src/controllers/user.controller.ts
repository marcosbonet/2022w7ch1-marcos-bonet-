import { NextFunction, Request, Response } from 'express';
import { UserTypes } from '../entities/entities.js';

import { HTTPError } from '../interfaces/error.js';
import { UserRepository } from '../repository/user.repository.js';

export class UserController {
    constructor(public dataModel: UserRepository) {}

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
