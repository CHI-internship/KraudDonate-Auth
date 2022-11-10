import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { AdminAuthModule } from '../auth/admin-auth.module';
import { AdminService } from '../services/admin.service';
import { AdminPassController } from './admin-password.controller';
import { AdminPassService } from './admin-password.service';

@Module({
  controllers: [AdminPassController],
  providers: [AdminPassService, PrismaService, AdminService],
  imports: [AdminAuthModule],
})
export class AdminPassModule {}
