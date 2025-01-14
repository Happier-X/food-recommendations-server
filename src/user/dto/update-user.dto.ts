import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  name: string;
  avatar: string;
  @IsNotEmpty()
  preference: string;
}
