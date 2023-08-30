import { Controller, Post, Body, ValidationPipe, Put, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDTO, SignupDTO } from './dto/auth.dto';
import { InvalidCredentialsException, UserAlreadyExistsException, UserNotFoundException } from './exceptions/auth.expection';
import { UpdateUserDTO } from './dto/UpdateUser.dto';
import { ObjectId } from 'mongoose';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Post('signup')
  async signup(@Body(new ValidationPipe()) signupDTO: SignupDTO) {
    try {
      console.log('signupDTO', signupDTO)
      const user = await this.authService.create(signupDTO);
      const token = await this.authService.generateToken(user);

      return { user, token };

    } catch (error) {
      if (error instanceof UserAlreadyExistsException) {
        return { message: 'User with the same email already exists' };
      } else {
        throw new Error(error);
      }
    }
  }

  @Post('signin')
  async signin(@Body(new ValidationPipe()) signinDTO: SigninDTO) {
    try {
      const user = await this.authService.findOne(signinDTO);
      const token = await this.authService.generateToken(user);
      return { user, token };
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        return { message: 'User not found' };
      } else if (error instanceof InvalidCredentialsException) {
        return { message: 'Invalid credentials' };
      } else {
        throw error;
      }
    }
  }

  @Put()
  async update(@Param('id') id: ObjectId, @Body(new ValidationPipe()) updateAuthDto: UpdateUserDTO) {
    try {
      const user = await this.authService.update(id, updateAuthDto);
      return { user };
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        return { message: 'User not found' };
      } else {
        throw error;
      }
    }
  }
}
