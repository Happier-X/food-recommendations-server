import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

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
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    }
    if (!(await argon2.verify(user.password, dto.password))) {
      throw new HttpException('密码错误', HttpStatus.BAD_REQUEST);
    }
    const payload = { username: user.name, sub: user.id };
    delete user.password;
    return {
      code: HttpStatus.OK,
      message: '登录成功',
      data: user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
