import { Request, Response } from 'express';
import { TaskFileData } from '../data/tasks.file.data';
import { TaskController } from './tasks';

describe('Given TaskController', () => {
    const model = new TaskFileData();
    const taskController = new TaskController(model);
    const req = {};
    const resp = {
        json: jest.fn(),
        end: jest.fn(),
    };
    test('Then ... getAll', () => {
        taskController.getAll(req as Request, resp as unknown as Response);
        expect(resp.json).toHaveBeenCalled();
        expect(resp.end).toHaveBeenCalled();
    });
});
