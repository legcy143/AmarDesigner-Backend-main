import { Injectable } from '@nestjs/common';
import { SigninDTO, SignupDTO } from './dto/auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import { JwtService } from '@nestjs/jwt';
import {
  UserNotFoundException,
  InvalidCredentialsException,
  UserAlreadyExistsException,
  // UserAlreadyExistsException,
} from './exceptions/auth.expection';
import { UpdateUserDTO } from './dto/UpdateUser.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private UserModal: Model<UserDocument>, private jwtService: JwtService) { }

  /**
   * Create a new user.
   * @param signupDTO - The data for creating a new user.
   * @returns The created user object.
   * @throws UserAlreadyExistsException when a user with the same email already exists.
   */
  async create(signupDTO: SignupDTO): Promise<UserDocument> {
    const existingUser = await this.UserModal.findOne({ email: signupDTO.email });

    if (existingUser) {
      throw new UserAlreadyExistsException();
    }

    const user = await this.UserModal.create(signupDTO);
    return user;
  }

  /**
   * Find a user by email and password.
   * @param signinDTO - The data containing email and password of the user.
   * @returns The found user object.
   * @throws UserNotFoundException when the user is not found.
   * @throws InvalidCredentialsException when the provided credentials are invalid.
   */
  async findOne(signinDTO: SigninDTO): Promise<UserDocument> {
    const user = await this.UserModal.findOne(signinDTO).select("-password");
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }

  /**
   * Update a user by ID.
   * @param id - The ID of the user to update.
   * @param updateAuthDto - The data for updating the user.
   * @returns The updated user object.
   * @throws UserNotFoundException when the user is not found.
   */
  async update(id: ObjectId, updateAuthDto: UpdateUserDTO): Promise<UserDocument> {
    const user = await this.UserModal.findByIdAndUpdate(id, updateAuthDto, {
      new: true,
    });

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }

  /**
   * Delete a user by ID.
   * @param id - The ID of the user to delete.
   * @returns The deleted user object.
   * @throws UserNotFoundException when the user is not found.
   */
  async remove(id: ObjectId): Promise<UserDocument> {
    const user = await this.UserModal.findByIdAndDelete(id);
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }

  /**
   * Use to generate JWT Token 
   * @param user 
   * @returns JWT String
   */
  async generateToken(user: User): Promise<string> {
    const payload = { sub: user.id, email: user.email, type: user.type }; // Customize the payload as needed
    return this.jwtService.sign(payload);
  }

  /**
   * Use to check whether the ObjectId provided and user exists in the database with type-Designer
   * @param id
   * @returns boolean 
   */
  async isDesigner(id: ObjectId): Promise<boolean> {
    const user = await this.UserModal.findOne({ _id: id, type: 'Designer' });
    if (!user) {
      return false;
    }
    return true;
  }

  /**
   * Use this to add Project Id to user's project array
   * @param id
   * @param projectId
   * @returns void
   */
  async addProjectToDesigner(id: ObjectId, projectId: ObjectId): Promise<void> {
    console.log('id', id)
    await this.UserModal.findByIdAndUpdate(id, { $push: { projects: projectId } });
  }
}
