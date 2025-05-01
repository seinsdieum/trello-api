import { Request, Response, NextFunction } from 'express';
import logger from '../modules/logger/index';

export function logging() {
  return (req: Request, res: Response, next: NextFunction) => {
    const { method, url } = req;
    const start = Date.now();

    res.on('finish', () => {
      const duration = Date.now() - start;
      const message = `${method} ${url} ${res.statusCode} - ${duration}ms`;
      logger.info(message);
    });

    next();
  };
}
