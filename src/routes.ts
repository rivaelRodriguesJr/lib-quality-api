import express from 'express';
import IssuesController from './app/controllers/IssuesController';
import SessionsController from './app/controllers/SessionsController';
import UsersController from './app/controllers/UsersController';
import authMiddleware from './app/middlewares/auth';

const routes = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The book title
 *         author:
 *           type: string
 *           description: The book author
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 */

 /**
  * @swagger
  * tags:
  *   name: Books
  *   description: The books managing API
  */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Returns the list of all the books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
routes.post('/sessions', SessionsController.store);
routes.post('/users', UsersController.store);

routes.use(authMiddleware);

routes.get('/issues', IssuesController.find);
routes.get('/issues/refresh', IssuesController.refresh);

routes.get('/users', UsersController.find);
routes.get('/users/:id', UsersController.findOne);

export default routes;
