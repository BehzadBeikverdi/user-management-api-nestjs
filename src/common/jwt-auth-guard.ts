import { ExecutionContext, Injectable} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
        console.log('handleRequest called, user:', user, 'info:', info);
        return super.handleRequest(err, user, info, context);
    }
}
