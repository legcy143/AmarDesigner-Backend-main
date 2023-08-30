import { IsString, IsEmail, IsPhoneNumber, IsPostalCode, IsEnum, IsNotEmpty, Matches, IsNumber, IsPositive, IsOptional, IsArray } from 'class-validator';
import { ObjectId } from 'mongoose';


export class ProjectDTO {
    @IsNotEmpty()
    @IsString()
    designerId: ObjectId;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsString()
    year: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    cost: number;

    @IsOptional()
    @IsArray()
    images?: string[];

    @IsOptional()
    @IsString()
    portfolio?: string;
}