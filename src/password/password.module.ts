import { Module } from '@nestjs/common';
import { PasswordService } from './password.service';
import { PasswordController } from './password.controller';
import { PrismaService } from 'src/services/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { BullModule } from '@nestjs/bull';
import { PasswordProcessor } from './password.processor';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import TokensRepository from 'src/tokens/repository/tokens.repository';

@Module({
  controllers: [PasswordController],
  providers: [
    PasswordService,
    PrismaService,
    PasswordProcessor,
    TokensRepository,
  ],
  imports: [
    AuthModule,
    BullModule.registerQueue({
      name: 'reset',
    }),
    UserModule,
  ],
})
export class PasswordModule {}
