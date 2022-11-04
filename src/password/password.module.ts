import { Module } from '@nestjs/common';
import { PasswordService } from './password.service';
import { PasswordController } from './password.controller';
import { PrismaService } from 'src/services/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [PasswordController],
  providers: [PasswordService, PrismaService],
  imports: [AuthModule]
})
export class PasswordModule { }
