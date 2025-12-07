import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CustomLoggerService } from './custom-logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    constructor(private readonly logger: CustomLoggerService) {}

    use = (req: Request, res: Response, next: NextFunction) => {
        const { method, originalUrl } = req;
        const startTime = Date.now();

        // Capture response body
        const oldJson = res.json.bind(res);

        let responseBody: any;

        res.json = (body: any) => {
            responseBody = body;       // <-- we capture the response here
            return oldJson(body);
        };

        res.on('finish', () => {
            const responseTime = Date.now() - startTime;
            const { statusCode } = res;

            const logMessage = {
                method,
                url: originalUrl,
                statusCode,
                duration: `${responseTime}ms`,
                requestBody: req.body,
                responseBody,
            };

            this.logger.log(JSON.stringify(logMessage));
        });

        next();
    };
}
