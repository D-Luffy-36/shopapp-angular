import { IsString, IsNotEmpty, IsPhoneNumber, IsDate, IsNumber } from 'class-validator';

export class RegisterDTO {
    @IsString()
    fullname: string;

    @IsString()
    @IsPhoneNumber()
    phone_number: string;

    @IsString()
    address: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    retype_password: string;

    @IsString()
    is_active: boolean;

    @IsDate()
    date_of_birth: Date;

    @IsString()
    facebook_account_id: string;
    @IsString()
    google_account_id: string;

    @IsNumber()
    role_id: number;

    constructor(data: any) {
        this.fullname = data.full_name;
        this.phone_number = data.phone_number
        this.password = data.password
        this.retype_password = data.phone_number
        this.phone_number = data.phone_number
        this.address = data.address
        this.is_active = data.is_active
        this.date_of_birth = data.date_of_birth
        this.facebook_account_id = data.facebook_account_id || '0'
        this.google_account_id = data.google_account_id || '0'
        this.role_id = data.role_id || 2
    }
}
