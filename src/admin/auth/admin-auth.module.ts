import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { AdminService } from '../services/admin.service';
import { AdminAuthController } from './admin-auth.controller';
import { AdminAuthService } from './admin-auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.PRIVATE_KEY,
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  controllers: [AdminAuthController],
  providers: [AdminAuthService, PrismaService, AdminService],
  exports: [AdminAuthService],
})
export class AdminAuthModule {}
