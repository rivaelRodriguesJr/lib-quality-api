import express from 'express';

import IssuesController from './app/controllers/IssuesController';
import SessionsController from './app/controllers/SessionsController';
import UsersController from './app/controllers/UsersController';
import authMiddleware from './app/middlewares/auth';

const routes = express.Router();

routes.post('/sessions', SessionsController.store);
routes.post('/users', UsersController.store);

routes.use(authMiddleware);

routes.get('/issues', IssuesController.find);
routes.get('/issues/history', IssuesController.history);
routes.get('/issues/refresh', IssuesController.refresh);

routes.get('/users/:id', UsersController.findOne);

export default routes;
