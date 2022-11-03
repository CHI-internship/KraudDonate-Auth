import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';

import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from '../services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async registration(userDto: CreateUserDto) {
    const { email, password, role } = userDto;
    const candidate = await this.usersService.getUserByEmail(email);

    if (candidate) {
      throw new BadRequestException(
        `User with this email  ${email} has already exist`,
      );
    }

    const hashedPassword = crypto
      .createHmac(process.env.ALGORITM_DECODE_PASSWORD, password)
      .update(password)
      .digest('hex');

    const user = await this.usersService.createUser(
      email,
      hashedPassword,
      role,
    );

    return this.generateToken(email,role);
  }

  async login(userDto: LoginUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user.email, user.role);
  }

  private async validateUser(userDto: LoginUserDto) {
    const { email, password } = userDto;

    const user = await this.usersService.getUserByEmail(email);

    if (!user) {
      throw new BadRequestException('Wrong email or password ');
    }

    const comparePassword = crypto
      .createHmac(process.env.ALGORITM_DECODE_PASSWORD, password)
      .update(password)
      .digest('hex');

    if (comparePassword !== user.password) {
      throw new BadRequestException('Wrong email or password ');
    }

    return user;
  }

  private async generateToken(email: string, role: string) {
    const payload = { email, role };
    return this.jwtService.sign(payload);
  }
}
