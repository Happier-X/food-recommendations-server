import { PartialType } from '@nestjs/mapped-types';
import { CreateFoodDto } from './create-food.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateFoodDto extends PartialType(CreateFoodDto) {
  @IsNotEmpty()
  id: number;
}
