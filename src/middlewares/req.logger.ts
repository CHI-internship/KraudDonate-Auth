import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import * as os from 'os';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl, hostname, protocol } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('finish', () => {
      const { statusCode } = response;

      this.logger.log(
        `${os.hostname()} Method ${method}: ${protocol}://${hostname}${originalUrl} Status: ${statusCode} UserAgent: ${userAgent} IP ${ip}`,
      );
    });

    next();
  }
}
