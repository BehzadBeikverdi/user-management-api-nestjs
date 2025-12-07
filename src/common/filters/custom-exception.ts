import { HttpException, HttpStatus } from '@nestjs/common';

export class BadRequestExceptionCustom extends HttpException {
    constructor(message: string, errors: any[] = []) {
        super({ message, errors }, HttpStatus.BAD_REQUEST);
    }
}

export class UnauthorizedExceptionCustom extends HttpException {
    constructor(message: string, errors: any[] = []) {
        super({ message, errors }, HttpStatus.UNAUTHORIZED);
    }
}

export class ForbiddenExceptionCustom extends HttpException {
    constructor(message: string, errors: any[] = []) {
        super({ message, errors }, HttpStatus.FORBIDDEN);
    }
}

export class NotFoundExceptionCustom extends HttpException {
    constructor(message: string, errors: any[] = []) {
        super({ message, errors }, HttpStatus.NOT_FOUND);
    }
}

export class InternalServerExceptionCustom extends HttpException {
    constructor(message: string = 'Internal Server Error', errors: any[] = []) {
        super({ message, errors }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
