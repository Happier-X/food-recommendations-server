import { IsNotEmpty } from 'class-validator';

export class CreateRatingDto {
  @IsNotEmpty()
  foodId: number;
  @IsNotEmpty()
  userRating: number;
}
