import { Injectable } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RatingService {
  constructor(private prismaService: PrismaService) {}
  async create(createRatingDto: CreateRatingDto, user) {
    const existingRating = await this.prismaService.rating.findFirst({
      where: {
        foodId: +createRatingDto.foodId,
        userId: user.userId,
      },
    });
    if (existingRating) {
      await this.prismaService.rating.update({
        where: { id: existingRating.id },
        data: { userRating: createRatingDto.userRating },
      });
    } else {
      await this.prismaService.rating.create({
        data: {
          ...createRatingDto,
          userId: user.userId,
        },
      });
    }
    return {
      message: '评分成功',
    };
  }

  findOne(id: number) {
    return this.prismaService.rating.findMany({
      where: {
        foodId: +id,
      },
    });
  }
}
