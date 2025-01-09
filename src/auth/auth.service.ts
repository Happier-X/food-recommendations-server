import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as argon2 from 'argon2';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(dto: RegisterDto) {
    if (!dto.password) {
      throw new Error('密码不能为空');
    }

    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        role: dto.role,
        password: await argon2.hash(dto.password),
      },
    });

    delete user.password;

    return {
      message: '注册成功',
      data: user,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: { name: dto.name },
    });

    if (!user) {
      throw new BadRequestException('用户不存在');
    }
    if (!(await argon2.verify(user.password, dto.password))) {
      throw new BadRequestException('密码错误');
    }
    delete user.password;
    return {
      message: '登录成功',
      data: user,
    };
  }
}
