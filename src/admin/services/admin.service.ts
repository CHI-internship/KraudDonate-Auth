import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prismaService: PrismaService) {}

  async getAdminByEmail(email: string) {
    return this.prismaService.admin.findFirst({
      where: { email },
    });
  }

  async updateAdminPassword(email: string, newPassword: string) {
    return this.prismaService.admin.update({
      where: { email },
      data: { password: newPassword },
    });
  }
}
