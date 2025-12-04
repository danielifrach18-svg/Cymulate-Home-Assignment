import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.body && req.body.operationName !== 'IntrospectionQuery') {
      const startTime = Date.now();
      this.logRequestInfo(req);

      next();

      res.on('finish', () => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        this.logResponseInfo(res, duration);
      });
    } else {
      next();
    }
  }

  private logRequestInfo(req: Request): void {
    console.log(`${req.method} ${req.originalUrl}`);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    console.log('Timestamp:', new Date().toISOString());
  }

  private logResponseInfo(res: Response, duration: number): void {
    console.log(`Status: ${res.statusCode}`);
    console.log(`Duration: ${duration.toFixed(2)} ms`);
  }
}
