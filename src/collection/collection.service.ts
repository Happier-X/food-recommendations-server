import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCollectionDto } from './dto/create-collection.dto';

@Injectable()
export class CollectionService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCollectionDto: CreateCollectionDto, user) {
    // 查找是否已经收藏
    const existingCollection = await this.prismaService.collection.findFirst({
      where: {
        foodId: +createCollectionDto.foodId,
        userId: user.userId,
      },
    });

    if (existingCollection) {
      // 如果已经收藏,则删除
      await this.prismaService.collection.delete({
        where: {
          id: existingCollection.id,
        },
      });
      return {
        message: '取消收藏成功',
      };
    } else {
      // 如果未收藏,则创建
      await this.prismaService.collection.create({
        data: {
          foodId: +createCollectionDto.foodId,
          userId: user.userId,
        },
      });
      return {
        message: '收藏成功',
      };
    }
  }

  async findAll(user) {
    let collections = [];
    collections = await this.prismaService.collection.findMany({
      where: {
        userId: user.userId,
      },
    });
    for (const collection of collections) {
      collection.food = await this.prismaService.food.findUnique({
        where: {
          id: collection.foodId,
        },
      });
    }
    for (const collection of collections) {
      collection.food.user = await this.prismaService.user.findUnique({
        where: {
          id: collection.food.userId,
        },
      });
    }
    return collections;
  }
}
