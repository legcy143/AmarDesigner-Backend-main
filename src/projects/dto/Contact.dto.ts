import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";
import { ObjectId, isObjectIdOrHexString } from "mongoose";

export class ContactDTO {
    @IsNotEmpty()
    @IsString()
    from: ObjectId;

    @IsNotEmpty()
    @IsString()
    message: string;
}