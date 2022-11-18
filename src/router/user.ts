import { Router } from 'express';
import { UserController } from '../controllers/user.controller.js';
import { UserRepository } from '../repository/user.repository.js';

export const playerRouter = Router();

const controller = new UserController(new UserRepository());

playerRouter.post('/login', controller.post.bind(controller));
playerRouter.post('/register', controller.post.bind(controller));
