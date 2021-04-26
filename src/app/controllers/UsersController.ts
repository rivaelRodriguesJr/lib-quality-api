import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';

import knex from '../../config/database/connection';
import { Repository } from '../models/Repositoy';
import { User } from '../models/User';
import { tb_users_repositories } from '../models/UsersRepositories';

class UsersController {
  async store(request: Request, response: Response) {
    const { name, username, password, repositories } = request.body;

    const [userExists] = await knex.select('*').from<User>('users').where('username', username);

    if (userExists) {
      return response.status(409).json({ error: 'User already exists.' });
    }

    const password_hash = await bcrypt.hash(password, 8);

    const trx = await knex.transaction();
    const [userId] = await trx('users').insert({
      name,
      username,
      password: password_hash
    });

    if (repositories?.length && repositories.length > 0) {
      const usersRepositories: tb_users_repositories[] = repositories.map((repositoryId: number) => {
        return {
          repository_id: repositoryId,
          user_id: userId
        }
      });

      await trx('users_repositories').insert(usersRepositories);
    }

    await trx.commit();

    return response.status(201).json({ userId });
  }

  async findOne(request: Request, response: Response) {
    const { id } = request.params;

    const [user] = await knex.select('id', 'name', 'username').from<User>('users').where('id', id);
    const repositories = await knex.select('repositories.*').from<Repository>('repositories')
      .join('users_repositories', 'repositories.id', '=', 'users_repositories.repository_id')
      .where('users_repositories.user_id', user.id);

    return response.json({ ...user, repositories });
  }

}

export default new UsersController();

