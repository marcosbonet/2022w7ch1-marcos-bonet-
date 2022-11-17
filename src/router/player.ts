import { Router } from 'express';
import { PlayerController } from '../controllers/player.js';
import { PLayerRepository } from '../repository/player.mongo.repository.js';

export const playerRouter = Router();

const controller = new PlayerController(new PLayerRepository());

playerRouter.get('/:id', controller.get.bind(controller));

playerRouter.get('/', controller.getAll.bind(controller));

playerRouter.post('/', controller.post.bind(controller));
playerRouter.patch('/:id', controller.patch.bind(controller));
playerRouter.delete('/:id', controller.delete.bind(controller));
