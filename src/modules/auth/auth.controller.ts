import {Body, Controller, Get, Inject, Post, Req, UseGuards} from '@nestjs/common';
import { RolesGuard } from '../../common/roles.guard';
import { Roles } from '../../common/roles.decorator';
import { RoleEnum } from '../../common/eums/roleEnum';
import {UserService} from "../user/user.service";
import {AuthService} from "./auth.service";
import {ApiBearerAuth, ApiOperation, ApiTags} from "@nestjs/swagger";
import {LoginDto} from "./login.dto";
import {BaseResponseModel} from "../../common/models/base-response-model";
import {JwtAuthGuard} from "../../common/jwt-auth-guard";
import * as userServiceInterface from "../../shared/contracts/user-service.interface";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        @Inject('IUserService')
        private userService: userServiceInterface.IUserService,
    ) {}

    @Post('login')
    @ApiOperation({ summary: 'Login and generate JWT token' })
    async login(@Body() loginDto: LoginDto) {
        // Find user by email
        const user = await this.userService.findByEmail(loginDto.email);

        const token = await this.authService.login(user);

        return BaseResponseModel.success('Login successful', token);
    }

    @Get('dashboard')
    @Roles(RoleEnum.ADMIN)
    @ApiBearerAuth('JWT')
    @UseGuards(JwtAuthGuard, RolesGuard)
    getAdminData() {
        return BaseResponseModel.success('Access granted', { message: 'Admin dashboard' });
    }

    @Get('profile')
    @ApiBearerAuth('JWT')
    @Roles(RoleEnum.USER, RoleEnum.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    getProfile() {
        return BaseResponseModel.success('Access granted', {
            message: 'Profile page',
        });
    }
}
