import { IsString, IsEmail, IsPhoneNumber, IsPostalCode, IsEnum, ValidateIf, IsDefined, Matches, MATCHES, IsOptional } from 'class-validator';
import { CategoryEnum } from '../schema/user.schema';

export class UpdateUserDTO {
    @IsOptional()
    @IsString()
    companyName: string;

    @IsPhoneNumber('IN')
    phone?: number;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsString()
    city?: string;
    
    @IsOptional()
    @IsString()
    state?: string;

    @IsOptional()
    @IsString()
    country?: string;
    
    @IsOptional()
    @IsPostalCode()
    pincode?: number;
    
    @IsOptional()
    @IsEnum(CategoryEnum)
    category?: string;
    
    @IsOptional()
    @IsString()
    companyPhoto?: string;



    @IsString()
    description?: string;



    @IsString()
    @IsOptional()
    // regex to check website url is true or not
    @Matches(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/, {
        message: 'Please enter a valid website url',
    })
    website?: string;
    
    // Social Links
    @IsOptional()
    @IsString()
    @Matches(/^(https?:\/\/)?((w{3}\.)?)?facebook\.com\/(?!home\.php).+$/, {
        message: 'Please enter a valid facebook url',
    })
    facebook?: string;
    
    @IsOptional()
    @IsString()
    @Matches(/^(https?:\/\/)?(www\.)?instagram\.com\/[a-zA-Z0-9_]+$/, {
        message: 'Please enter a valid Instagram url',
    })
    instagram?: string;
    
    @IsOptional()
    @IsString()
    @Matches(/^(https?:\/\/)?([a-z]{2,3}\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+$/, {
        message: 'Please enter a valid LinkedIn url',
    })
    linkedin?: string;

}