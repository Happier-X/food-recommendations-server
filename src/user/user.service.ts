import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  async getUserInfo(user) {
    let userInfo;
    userInfo = await this.prismaService.user.findUnique({
      where: {
        id: user.userId,
      },
    });
    userInfo.collectionCount = await this.prismaService.collection.count({
      where: {
        userId: user.userId,
      },
    });
    userInfo.recommendCount = await this.prismaService.food.count({
      where: {
        userId: user.userId,
      },
    });
    return userInfo;
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
