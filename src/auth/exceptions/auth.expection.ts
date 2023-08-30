import { BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
  constructor() {
    super('User not found');
  }
}

export class InvalidCredentialsException extends BadRequestException {
  constructor() {
    super('Invalid credentials');
  }
}

export class UserAlreadyExistsException extends ConflictException {
  constructor() {
    super('User with the same email already exists');
  }
}