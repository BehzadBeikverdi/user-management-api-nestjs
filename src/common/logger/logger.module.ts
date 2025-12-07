import { Module, Global } from '@nestjs/common';
import { CustomLoggerService } from './custom-logger.service';

@Global() // makes this module's providers available everywhere
@Module({
    providers: [CustomLoggerService],
    exports: [CustomLoggerService], // export to make it injectable in other modules
})
export class LoggerModule {}
