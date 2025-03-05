import { IsString } from "class-validator";

export class UpdateAddressDto {
    @IsString()
    street: string;
  
    @IsString()
    city: string;
  
    @IsString()
    state: string;
  
    @IsString()
    postalCode: string;
  
    @IsString()
    country: string;
  }