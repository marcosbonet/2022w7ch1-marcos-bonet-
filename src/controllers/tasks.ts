import { NextFunction, Request, Response } from 'express';
import { Task } from '../interfaces/task.js';
import importData from '../mock/data.json' assert { type: 'json' };

// eslint-disable-next-line prefer-const
let data: Array<Task> = importData.tasks;

export class TaskController {
    getAll(req: Request, resp: Response) {
        resp.json(data);
        resp.end();
    }

    get(req: Request, resp: Response) {
        //
    }

    post(req: Request, resp: Response) {
        const newTask = {
            ...req.body,
            id: data.length + 1,
        };
        data.push(newTask);
        resp.json(newTask);
        resp.end();
    }

    patch(req: Request, resp: Response) {
        const updateTask = {
            ...data.find((item) => item.id === +req.params.id),
            ...req.body,
        };
        data[data.findIndex((item) => item.id === +req.params.id)] = updateTask;
        resp.json(updateTask);
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
