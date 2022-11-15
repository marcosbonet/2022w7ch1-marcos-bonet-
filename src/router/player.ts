import { Router } from 'express';
import { PlayerController } from '../controllers/player.js';
import { PlayerFileData } from '../repository/player.file.repository.js';

export const playerRouter = Router();

const controller = new PlayerController(new PlayerFileData());

playerRouter.get('/:id', controller.get.bind(controller));

playerRouter.get('/', controller.getAll.bind(controller));

playerRouter.post('/', controller.post.bind(controller));
playerRouter.patch('/:id', controller.patch.bind(controller));
playerRouter.delete('/:id', controller.delete.bind(controller));
