import { IsNotEmpty, IsNumber } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  @IsNumber()
  role: number;
  @IsNotEmpty()
  password: string;
}
