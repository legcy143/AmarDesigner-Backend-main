import { IsString, IsEmail, IsPhoneNumber, IsPostalCode, IsEnum, IsNotEmpty, Matches, IsNumber, IsPositive, IsOptional, IsArray } from 'class-validator';
import { ObjectId } from 'mongoose';


export class UpdateProjectDTO {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    designerId: ObjectId;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    address: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    year: string;

    @IsNotEmpty()
    @IsOptional()
    @IsNumber()
    @IsPositive()
    cost: number;

    @IsOptional()
    @IsOptional()
    @IsArray()
    images?: string[];

    @IsOptional()
    @IsOptional()
    @IsString()
    portfolio?: string;
}