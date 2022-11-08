import { Module } from '@nestjs/common';
import { PasswordService } from './password.service';
import { PasswordController } from './password.controller';
import { PrismaService } from 'src/services/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { BullModule } from '@nestjs/bull';
import { PasswordProcessor } from './password.processor';

@Module({
  controllers: [PasswordController],
  providers: [PasswordService, PrismaService, PasswordProcessor],
  imports: [
    AuthModule,
    BullModule.registerQueue({
      name: 'reset'
    })
  ]
})
export class PasswordModule { }
