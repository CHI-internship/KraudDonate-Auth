import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

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
    const { email, password } = userDto;
    const candidate = await this.usersService.getUserByEmail(email);

    if (candidate) {
      throw new BadRequestException(
        `User with this email  ${email} has already exist`,
      );
    }

    const hashedPassword = await bcrypt.hash(password, 6);
    const user = await this.usersService.createUser(email, hashedPassword);

    return 'User successfully registered';
  }

  async login(userDto: LoginUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user.email);
  }

  private async validateUser(userDto: LoginUserDto) {
    const { email, password } = userDto;

    const user = await this.usersService.getUserByEmail(email);

    if (!user) {
      throw new BadRequestException('Wrong email or password ');
    }

    const passwordEquals = await bcrypt.compare(password, user.password);

    if (!passwordEquals) {
      throw new BadRequestException('Wrong email or password ');
    }

    return user;
  }

  private async generateToken(email: string) {
    const payload = { email };
    return this.jwtService.sign(payload);
  }
}
