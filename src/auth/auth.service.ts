import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as argon2 from 'argon2';

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
}
