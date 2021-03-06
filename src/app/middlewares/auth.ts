import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

export default async (request: Request, response: Response, next: NextFunction) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ error: 'Token required.' });
  }

  const [, token] = authHeader.split(' ');

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) {
      return response.status(401).json({ error: 'Invalid token.' });
    }

    (request as any).userId = (decoded as any).id;
    next();
  });

}
