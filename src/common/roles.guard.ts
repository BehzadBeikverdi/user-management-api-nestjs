import {Injectable, CanActivate, ExecutionContext} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleEnum } from './eums/roleEnum';
import {ForbiddenExceptionCustom} from "./filters/custom-exception";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.get<RoleEnum[]>('roles', context.getHandler());
        if (!requiredRoles) return true;

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (!user) {
            throw new ForbiddenExceptionCustom('JWT token missing or invalid'); // Use your custom exception
        }

        if (!requiredRoles.includes(user.role)) {
            throw new ForbiddenExceptionCustom('User does not have permission for this route');
        }

        return true;
    }
}