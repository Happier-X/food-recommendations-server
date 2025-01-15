import { Injectable } from '@nestjs/common';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { PrismaService } from 'src/prisma/prisma.service';

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

  findAll() {
    return `This action returns all collection`;
  }

  findOne(id: number) {
    return `This action returns a #${id} collection`;
  }

  update(id: number, updateCollectionDto: UpdateCollectionDto) {
    return `This action updates a #${id} collection`;
  }

  remove(id: number) {
    return `This action removes a #${id} collection`;
  }
}
