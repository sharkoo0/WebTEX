import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization;
  if (!token) {
    res.sendStatus(401);
    return;
  } else {
    try {
      const verified: any = jwt.verify(token, 'TOPSECRETCODE');
      res.locals.username = verified.name;
      next();
    } catch (error) {
      res.sendStatus(403).send('Your token has expired');
    }
  }
}
