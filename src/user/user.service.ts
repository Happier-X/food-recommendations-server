import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  getUserInfo(user) {
    return this.prismaService.user.findUnique({
      where: {
        id: user.userId,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.prismaService.user.update({
      where: {
        id: id,
      },
      data: {
        name: updateUserDto.name,
        avatar: updateUserDto.avatar,
        preference: updateUserDto.preference,
      },
    });
    return '更新成功';
  }

  async getRecommendFood(user) {
    let recommendFood = [];
    recommendFood = await this.prismaService.food.findMany({
      where: {
        userId: user.userId,
      },
    });
    for (const food of recommendFood) {
      food.user = await this.prismaService.user.findUnique({
        where: {
          id: food.userId,
        },
      });
    }
    return recommendFood;
  }
}
