import { HttpException, HttpStatus } from '@nestjs/common';

export class ProjectNotFoundException extends HttpException {
  constructor() {
    super('Project not found', HttpStatus.NOT_FOUND);
  }
}

export class ProjectCreationException extends HttpException {
  constructor() {
    super('Error occurred while creating the project', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class ProjectDeletionException extends HttpException {
  constructor() {
    super('Error occurred while deleting the project', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class ProjectDesignerIdException extends HttpException {
  constructor() {
    super('Invalid designerId', HttpStatus.BAD_REQUEST);
  }
}