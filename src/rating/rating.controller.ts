import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { RatingService } from './rating.service';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  create(@Body() createRatingDto: CreateRatingDto, @Req() req) {
    return this.ratingService.create(createRatingDto, req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ratingService.findOne(+id);
  }
}
