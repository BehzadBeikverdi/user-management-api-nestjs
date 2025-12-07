import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [
        UserService,
        {
            provide: 'IUserService',  // token for interface
            useClass: UserService,    // actual implementation
        },
    ],
    exports: ['IUserService'], // export token for other modules
})
export class UserModule {}
