import { Injectable } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { distance, point } from '@turf/turf';

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
    const foodWithUserAndAverageRating = await Promise.all(
      food.map(async (item) => {
        const user = await this.prismaService.user.findUnique({
          where: {
            id: item.userId,
          },
        });
        const ratings = await this.prismaService.rating.findMany({
          where: {
            foodId: item.id,
          },
        });
        const sumRating = ratings.reduce(
          (acc, curr) => acc + curr.userRating,
          0,
        );
        const averageRating = (sumRating + item.rating) / (ratings.length + 1);
        return {
          ...item,
          user,
          averageRating,
        };
      }),
    );
    return foodWithUserAndAverageRating;
  }

  async findOne(id: number, user?: any) {
    const food = await this.prismaService.food.findUnique({
      where: {
        id,
      },
    });

    const foodUser = await this.prismaService.user.findUnique({
      where: {
        id: food.userId,
      },
    });

    // 获取收藏状态
    let isCollected = false;
    if (user) {
      const collection = await this.prismaService.collection.findFirst({
        where: {
          foodId: +id, // 确保转换为数字类型
          userId: user.userId,
        },
      });
      isCollected = collection !== null; // 明确判断是否存在收藏记录
    }

    // 获取用户评分
    const userRating = await this.prismaService.rating.findFirst({
      where: {
        foodId: +id,
        userId: user.userId,
      },
    });

    const ratings = await this.prismaService.rating.findMany({
      where: {
        foodId: +id,
      },
    });
    const sumRating = ratings.reduce((acc, curr) => acc + curr.userRating, 0);
    const averageRating = (sumRating + food.rating) / (ratings.length + 1);
    return {
      ...food,
      user: foodUser,
      isCollected,
      userRating: userRating?.userRating,
      averageRating,
    };
  }

  async update(id: number, updateFoodDto: UpdateFoodDto) {
    return await this.prismaService.food.update({
      where: {
        id,
      },
      data: {
        id: updateFoodDto.id,
        name: updateFoodDto.name,
        shopName: updateFoodDto.shopName,
        location: updateFoodDto.location,
        latitude: updateFoodDto.latitude,
        longitude: updateFoodDto.longitude,
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

  async findByCondition(id?: string, name?: string) {
    const where: any = {};

    if (id && id !== '0') {
      where.foodType = id;
    }

    if (name) {
      where.name = {
        contains: name,
      };
    }

    const foods = await this.prismaService.food.findMany({
      where,
    });
    const foodWithUserAndAverageRating = await Promise.all(
      foods.map(async (item) => {
        const user = await this.prismaService.user.findUnique({
          where: {
            id: item.userId,
          },
        });
        const ratings = await this.prismaService.rating.findMany({
          where: {
            foodId: item.id,
          },
        });
        const sumRating = ratings.reduce(
          (acc, curr) => acc + curr.userRating,
          0,
        );
        const averageRating = (sumRating + item.rating) / (ratings.length + 1);
        return {
          ...item,
          user,
          averageRating,
        };
      }),
    );
    return foodWithUserAndAverageRating;
  }

  async findByLocation(lat: string, lng: string, radius: number = 1000) {
    const location = point([parseFloat(lng), parseFloat(lat)]);
    const foods = await this.prismaService.food.findMany({
      where: {
        latitude: {
          not: null,
        },
        longitude: {
          not: null,
        },
      },
    });
    const nearFoods = foods.filter((food) => {
      const foodLocation = point([food.longitude, food.latitude]);
      const dist = distance(location, foodLocation, { units: 'meters' });
      return dist <= radius;
    });
    const foodWithUserAndAverageRating = await Promise.all(
      nearFoods.map(async (item) => {
        const user = await this.prismaService.user.findUnique({
          where: {
            id: item.userId,
          },
        });
        const ratings = await this.prismaService.rating.findMany({
          where: {
            foodId: item.id,
          },
        });
        const sumRating = ratings.reduce(
          (acc, curr) => acc + curr.userRating,
          0,
        );
        const averageRating = (sumRating + item.rating) / (ratings.length + 1);
        return {
          ...item,
          user,
          averageRating,
        };
      }),
    );
    return foodWithUserAndAverageRating;
  }
}
