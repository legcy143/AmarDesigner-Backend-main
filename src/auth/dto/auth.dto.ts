import { IsString, IsEmail, IsPhoneNumber, IsPostalCode, IsEnum, IsNotEmpty, ValidateIf, IsDefined, Matches, MATCHES, IsOptional } from 'class-validator';
import { CategoryEnum, UserEnum } from '../schema/user.schema';

export class SignupDTO {
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsEnum(UserEnum)
    type: string;

    @ValidateIf((object, value) => object.type === UserEnum.Designer)

    @IsString()
    @IsNotEmpty()
    companyName: string;

    @ValidateIf((object, value) => object.type === UserEnum.Designer)

    @IsPhoneNumber('IN')
    phone?: number;

    @IsString()
    @ValidateIf((object, value) => object.type === UserEnum.Designer)

    @IsNotEmpty()
    address?: string;

    @IsString()
    @ValidateIf((object, value) => object.type === UserEnum.Designer)

    @IsNotEmpty()
    city?: string;

    @IsString()
    @ValidateIf((object, value) => object.type === UserEnum.Designer)

    @IsNotEmpty()
    state?: string;

    @IsString()
    @ValidateIf((object, value) => object.type === UserEnum.Designer)

    @IsNotEmpty()
    country?: string;

    @IsPostalCode()
    @ValidateIf((object, value) => object.type === UserEnum.Designer)

    pincode?: number;

    @IsEnum(CategoryEnum)
    @ValidateIf((object, value) => object.type === UserEnum.Designer)

    category?: string;

    @ValidateIf((object, value) => object.type === UserEnum.Designer)

    @IsString()
    companyPhoto?: string;

    @ValidateIf((object, value) => object.type === UserEnum.Designer)

    @IsString()
    description?: string;

    @ValidateIf((object, value) => object.type === UserEnum.Designer)

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

export class SigninDTO {
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}
