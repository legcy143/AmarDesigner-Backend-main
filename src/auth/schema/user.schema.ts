import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId } from "mongoose";
import { IsString, IsEmail, IsPhoneNumber, IsPostalCode, IsEnum, IsNotEmpty, ValidateIf, Matches, IsArray } from 'class-validator';

export enum UserEnum {
    Customer = 'customer',
    Designer = 'designer'
}

export enum CategoryEnum {
    Architect = 'Architect',
    InteriorDesigner = 'Interior Designer',
    GeneralContractor = 'General Contractor',
    CivilEngineers = 'Civil Engineers',
    LandscapeArchitects = 'Landscape Architects',
    ModularFurniture = 'Modular Furniture',
    HomeService = 'Home Service',
    FlooringAndCarpet = 'Flooring and Carpet',
}

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
    @Prop({ required: true })
    @IsEmail()
    email: string;

    @Prop({ required: true })
    @IsString()
    password: string;

    @Prop({ required: true })
    @IsEnum(CategoryEnum)
    type: UserEnum;

    @Prop()
    companyName?: string;

    @Prop()
    companyLogo?: string;

    @Prop()
    phone?: number;

    @Prop()
    address?: string;

    @Prop()
    city?: string;

    @Prop()
    state?: string;

    @Prop()
    country?: string;

    @Prop()
    pincode?: number;

    @Prop()
    category?: string;

    @Prop()
    description?: string;

    @Prop()
    website?: string;

    @Prop()
    facebook?: string;

    @Prop()
    instagram?: string;

    @Prop()
    linkedin?: string;

    @Prop({ default: [] })
    projects?: ObjectId[];

    @Prop({ default: [] })
    reviews?: ObjectId[];

    @Prop({ default: 0 })
    rating?: number;

    @Prop()
    isVerified?: boolean;

    @Prop({ default: [] })
    contacts?: ObjectId[]
}

export const UserSchema = SchemaFactory.createForClass(User);
