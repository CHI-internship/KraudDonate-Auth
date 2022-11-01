import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async getUserByEmail(email: string) {
    return this.prismaService.user.findFirst({
      where: { email },
    });
  }

  async createUser(email: string, password: string) {
    return this.prismaService.user.create({
      data: {
        email,
        password,
      },
    });
  }
}
