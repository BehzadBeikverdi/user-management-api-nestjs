import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ example: 'Behzad' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'behzad@example.com' })
    @IsString()
    @IsNotEmpty()
    email: string;
}
