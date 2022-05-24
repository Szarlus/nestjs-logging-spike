import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: Logger) {}

  use(req: Request, _res: Response, next: NextFunction) {
    this.logger.log(
      `[${req.method}] | ${req.originalUrl} | query: ${JSON.stringify(
        req.query,
      )} | body: ${JSON.stringify(req.body)}`,
    );
    next();
  }
}
