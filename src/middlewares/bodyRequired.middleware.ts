import { Request, Response, NextFunction } from 'express';

export function bodyRequired() {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) {
      res.status(400).json({ error: 'Request body required' });
      return;
    }

    next();
  };
}
