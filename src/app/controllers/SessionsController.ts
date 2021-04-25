import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';
import { User } from '../models/User';
import knex from '../../config/database/connection';

class SessionController {
  async store(request: Request, response: Response) {
    const { username, password } = request.body;

    const [user] = await knex.select('*').from<User>('users').where('username', username);

    if (!user) {
      return response.status(401).json({ error: 'Bad credentials.' });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return response.status(401).json({ error: 'Bad credentials.' });
    }

    const { id, name } = user;

    return response.json({
      user: {
        id,
        name,
        username
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      })
    });
  }
}

export default new SessionController();