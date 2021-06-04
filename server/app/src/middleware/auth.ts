import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// const secret = require('crypto').randomBytes(64).toString('hex');

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;
  if(!token) {
    res.sendStatus(401);
  } else {
    // process.env.PRIVATE_KEY
    try {
      const verified = jwt.verify(token, 'TOPSECRETCODE');
      next();
    } catch (error) {
      res.sendStatus(403).send('Your token has expired');
    }
  }
}