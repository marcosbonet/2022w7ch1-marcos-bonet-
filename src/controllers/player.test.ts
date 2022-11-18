import { NextFunction, Request, Response } from 'express';
import { PlayerController } from '../controllers/player.js';
import { PLayerRepository } from '../repository/player.mongo.repository';

jest.mock('../repository/player.mongo.repository');

describe('Given PlayerController', () => {
    PLayerRepository.prototype.getAll = jest.fn().mockResolvedValue(['player']);
    PLayerRepository.prototype.get = jest
        .fn()
        .mockResolvedValue(['63767bb8d09c41ef88a55efd']);
    const repository = new PLayerRepository();

    const playerController = new PlayerController(repository);
    const req: Partial<Request> = {};
    const resp: Partial<Response> = {
        json: jest.fn(),
    };
    const next: NextFunction = jest.fn();
    test('Then ... getAll', async () => {
        await playerController.getAll(req as Request, resp as Response, next);
        expect(resp.json).toHaveBeenCalledWith({
            argentinianPlayer: ['player'],
        });
    });
    test('Then if we use get(), it should have been called', async () => {
        await playerController.get(req as Request, resp as Response, next);
        expect(resp.json).toHaveBeenCalled();
    });
});
