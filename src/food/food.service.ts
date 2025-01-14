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

  async findAll() {
    let food = await this.prismaService.food.findMany();
    // forEach是同步执行的,内部的异步操作不会等待
    // 需要使用Promise.all来等待所有异步操作完成
    const foodWithUser = await Promise.all(
      food.map(async (item) => {
        const user = await this.prismaService.user.findUnique({
          where: {
            id: item.userId,
          },
        });
        return {
          ...item,
          user,
        };
      }),
    );
    return foodWithUser;
  }

  async findOne(id: number) {
    const food = await this.prismaService.food.findUnique({
      where: {
        id,
      },
    });

    const user = await this.prismaService.user.findUnique({
      where: {
        id: food.userId,
      },
    });

    return {
      ...food,
      user,
    };
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
        imageUrl: updateFoodDto.imageUrl || '',
      },
    });
  }

  async remove(id: number) {
    await this.prismaService.food.delete({
      where: {
        id,
      },
    });
    return {
      message: '删除成功',
    };
  }
}
