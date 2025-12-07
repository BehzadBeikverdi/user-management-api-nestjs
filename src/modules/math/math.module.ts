import { Module } from '@nestjs/common';
import { MathController } from './math.controller';
import { AppService } from './math.service';

@Module({
    controllers: [MathController],
    providers: [AppService],
})
export class MathModule {}
