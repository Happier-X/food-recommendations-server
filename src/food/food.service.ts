import { Injectable } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FoodService {
  constructor(private prismaService: PrismaService) {}
  create(createFoodDto: CreateFoodDto, user) {
    return this.prismaService.food.create({
      data: {
        ...createFoodDto,
        userId: user.userId,
      },
    });
  }

  findAll() {
    return this.prismaService.food.findMany();
  }

  findOne(id: number) {
    return this.prismaService.food.findFirst({
      where: { id },
    });
  }

  update(id: number, updateFoodDto: UpdateFoodDto) {
    return this.prismaService.food.update({
      where: {
        id,
      },
      data: {
        id: updateFoodDto.id,
        name: updateFoodDto.name,
        shopName: updateFoodDto.shopName,
        location: updateFoodDto.location,
        rating: updateFoodDto.rating,
        foodType: updateFoodDto.foodType,
        recommendation: updateFoodDto.recommendation,
        imageUrl: updateFoodDto.imageUrl,
      },
    });
  }

  remove(id: number) {
    this.prismaService.food.delete({
      where: {
        id,
      },
    });
    return {
      message: '删除成功',
    };
  }
}
