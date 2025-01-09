import { IsNotEmpty } from 'class-validator';

export class CreateFoodDto {
  @IsNotEmpty()
  name: string; // 美食名称
  @IsNotEmpty()
  shopName: string; // 商家名称
  @IsNotEmpty()
  location: string; // 店铺位置
  @IsNotEmpty()
  rating: number; // 评分
  @IsNotEmpty()
  foodType: string; // 食物类型
  @IsNotEmpty()
  recommendation: string; // 推荐理由
  @IsNotEmpty()
  imageUrl: string; // 图片链接
}