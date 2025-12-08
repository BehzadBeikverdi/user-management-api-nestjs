import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {SwaggerConfig} from "./common/swagger.config";
import {GlobalExceptionFilter} from "./common/filters/global-exception.filter";
import {LoggerMiddleware} from "./common/logger/logger-middleware";
import {CustomLoggerService} from "./common/logger/custom-logger.service";
import {LoggerInterceptor} from "./common/logger/logger.interceptor";


async function main() {
  const app = await NestFactory.create(AppModule);

  // Swagger configuration
  SwaggerConfig(app);

  const logger = app.get(CustomLoggerService);

  // Global interceptor
  app.useGlobalInterceptors(new LoggerInterceptor(logger));

  // Global exception filter
  app.useGlobalFilters(new GlobalExceptionFilter(logger));

  // Global middleware (if needed)
  // app.use(new LoggerMiddleware(logger).use);

  await app.listen(3000);

  console.log("Server run on: http://localhost:3000/");
  console.log("Swagger run on: http://localhost:3000/swagger");
}

main().then(() => null);
