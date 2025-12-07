import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Injectable,
} from '@nestjs/common';
import { BaseResponseModel } from '../models/base-response-model';
import { CustomLoggerService } from '../logger/custom-logger.service';

@Injectable()
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    constructor(private readonly logger: CustomLoggerService) {} // inject logger

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse();
        const req = ctx.getRequest();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Unexpected error occurred';
        let errors: any[] = [];

        // Handle NestJS HttpExceptions
        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const response = exception.getResponse();

            if (typeof response === 'string') {
                message = response;
            } else if (typeof response === 'object') {
                const r: any = response;
                message = r.message || message;
                errors = Array.isArray(r.errors)
                    ? r.errors
                    : r.message instanceof Array
                        ? r.message
                        : [r.message];
            }
        } else {
            // Handle unknown errors
            errors = [String(exception)];
        }

        // Log the error
        this.logger.error(
            `${req.method} ${req.url} - Status: ${status} - Message: ${message}`,
            exception instanceof Error ? exception.stack : undefined,
        );

        const responseModel = BaseResponseModel.error(message, errors);

        res.status(status).json(responseModel);
    }
}
