import { Router } from 'express';
import { PlayerSpainController } from '../controllers/player.spain.js';
import { PlayerSpainFileData } from '../repository/player.spain.file.repository.js';

export const playerRouter = Router();

const controller = new PlayerSpainController(new PlayerSpainFileData());

playerRouter.get('/:id', controller.get.bind(controller));

playerRouter.get('/', controller.getAll.bind(controller));

playerRouter.post('/', controller.post.bind(controller));
playerRouter.patch('/:id', controller.patch.bind(controller));
playerRouter.delete('/:id', controller.delete.bind(controller));
