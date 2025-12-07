import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import {UserModule} from "./modules/user/user.module";
import {MathModule} from "./modules/math/math.module";
import {LoggerModule} from "./common/logger/logger.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }), // ✅ load .env

    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
    }),

    UserModule,
    AuthModule,
    MathModule,

    LoggerModule
  ],
})
export class AppModule {}
