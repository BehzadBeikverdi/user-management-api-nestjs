import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

@Injectable()
export class CustomLoggerService implements LoggerService {
    private successLogger: winston.Logger;
    private clientErrorLogger: winston.Logger;
    private serverErrorLogger: winston.Logger;

    constructor() {
        this.successLogger = winston.createLogger({
            transports: [
                new winston.transports.DailyRotateFile({
                    dirname: 'logs/2xx',
                    filename: '%DATE%.log',
                    datePattern: 'YYYY-MM-DD',
                    zippedArchive: true,
                    maxFiles: '30d',
                    maxSize: '20m',
                }),
            ],
        });

        this.clientErrorLogger = winston.createLogger({
            transports: [
                new winston.transports.DailyRotateFile({
                    dirname: 'logs/4xx',
                    filename: '%DATE%.log',
                    datePattern: 'YYYY-MM-DD',
                    zippedArchive: true,
                    maxFiles: '30d',
                    maxSize: '20m',
                }),
            ],
        });

        this.serverErrorLogger = winston.createLogger({
            transports: [
                new winston.transports.DailyRotateFile({
                    dirname: 'logs/5xx',
                    filename: '%DATE%.log',
                    datePattern: 'YYYY-MM-DD',
                    zippedArchive: true,
                    maxFiles: '30d',
                    maxSize: '20m',
                }),
            ],
        });
    }

    log(message: any) {
        this.successLogger.info(message);
        console.log(message); // Also show in terminal
    }

    warn(message: any) {
        this.clientErrorLogger.warn(message);
        console.warn(message);
    }

    error(message: any, trace?: string) {
        const fullMessage = trace ? `${message}\nSTACK: ${trace}` : message;

        // 4xx errors → client-error log
        if (String(message).includes('4')) {
            this.clientErrorLogger.error(fullMessage);
        }
        // 5xx errors → server-error log
        else {
            this.serverErrorLogger.error(fullMessage);
        }

        console.error(fullMessage);
    }
}
