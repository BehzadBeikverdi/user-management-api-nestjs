import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user.dto';
import { User } from './user.entity';
import { BaseResponseModel } from '../../common/models/base-response-model';

@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @ApiOperation({ summary: 'Get all users' })
    async findAll(): Promise<BaseResponseModel<User[]>> {
        const users = await this.userService.findAll();
        return BaseResponseModel.success('Users fetched successfully', users);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get user by id' })
    async findOne(@Param('id') id: string): Promise<BaseResponseModel<User | null>> {
        const user = await this.userService.findOne(id);
        return BaseResponseModel.success('User fetched successfully', user);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new user' })
    @ApiBody({ type: CreateUserDto })
    async create(@Body() createUserDto: CreateUserDto): Promise<BaseResponseModel<User>> {
        const user = await this.userService.create(createUserDto);
        return BaseResponseModel.success('User created successfully', user);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a user' })
    async remove(@Param('id') id: string): Promise<BaseResponseModel<null>> {
        await this.userService.remove(id);
        return BaseResponseModel.success('User deleted successfully', null);
    }
}
