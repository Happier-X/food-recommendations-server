import { IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  role: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  password: string;
}
