import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './create-user.dto';
import {
    BadRequestExceptionCustom,
    NotFoundExceptionCustom,
} from '../../common/filters/custom-exception';
import {isUUID} from "class-validator";
import {IUserService} from "../../shared/contracts/user-service.interface";

@Injectable()
export class UserService implements IUserService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
    ) {}

    // Get all users
    findAll(): Promise<User[]> {
        return this.userRepo.find();
    }

    // Get a user by id
    async findOne(id: string): Promise<User> {
        if (!id) {
            throw new BadRequestExceptionCustom('Invalid user ID', ['ID must be provided']);
        }

        const user = await this.userRepo.findOneBy({ id });
        if (!user) {
            throw new NotFoundExceptionCustom(`User with ID ${id} not found`);
        }

        return user;
    }


    // Create a new user
    async create(createUserDto: CreateUserDto): Promise<User> {
        if (!createUserDto.name || !createUserDto.email) {
            throw new BadRequestExceptionCustom('Missing required fields', [
                'Name and Email are required',
            ]);
        }

        const existingUser = await this.userRepo.findOneBy({ email: createUserDto.email });
        if (existingUser) {
            throw new BadRequestExceptionCustom('Email already exists', [
                `Email ${createUserDto.email} is already registered`,
            ]);
        }

        const user = this.userRepo.create(createUserDto);
        return this.userRepo.save(user);
    }

    // Delete a user
    async remove(id: string): Promise<void> {
        // Validate input
        if (!id || !isUUID(id)) {
            throw new BadRequestExceptionCustom('Invalid user ID', ['ID must be a valid UUID']);
        }

        // Delete the user
        const result = await this.userRepo.delete(id);

        // Check if anything was deleted
        if (result.affected === 0) {
            throw new NotFoundExceptionCustom(`User with ID ${id} not found`);
        }
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.userRepo.findOneBy({ email });
        if (!user) {
            throw new NotFoundExceptionCustom(`User with email ${email} not found`);
        }
        return user;
    }
}
