import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { CustomLoggerService } from './custom-logger.service';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
    constructor(private readonly logger: CustomLoggerService) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context.switchToHttp().getRequest();
        const res = context.switchToHttp().getResponse();
        const { method, originalUrl } = req;

        const start = Date.now();

        return next.handle().pipe(
            tap({
                next: (responseBody) => {
                    const time = Date.now() - start;
                    const status = res.statusCode;

                    const log = {
                        method,
                        url: originalUrl,
                        status,
                        time: `${time}ms`,
                        response: responseBody,
                    };

                    if (status >= 200 && status < 300) {
                        this.logger.log(log);
                    } else if (status >= 400 && status < 500) {
                        this.logger.warn(log);
                    } else {
                        this.logger.error(`Error response`, JSON.stringify(log));
                    }
                },

                error: (err) => {
                    const time = Date.now() - start;

                    const log = {
                        method,
                        url: originalUrl,
                        time: `${time}ms`,
                        error: err.message,
                    };

                    if (err.status >= 400 && err.status < 500) {
                        this.logger.warn(log);
                    } else {
                        this.logger.error(`Server error`, JSON.stringify(log));
                    }
                },
            }),
        );
    }
}
