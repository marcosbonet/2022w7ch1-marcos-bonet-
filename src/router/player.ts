import { Router } from 'express';
import { PlayerController } from '../controllers/player.js';

export const playerRouter = Router();

const controller = new PlayerController();

playerRouter.get('/', controller.getAll);

playerRouter.post('/', controller.post);
playerRouter.patch('/:id', controller.patch);
playerRouter.delete('/:id', controller.delete);
