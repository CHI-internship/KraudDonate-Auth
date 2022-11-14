import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from '../services/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.PRIVATE_KEY,
      signOptions: {
        expiresIn: '1d',
      },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, UserService],
  exports: [AuthService],
})
export class AuthModule {}
