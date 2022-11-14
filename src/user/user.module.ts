import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import UserRepository from './repository/user.repository';
import { UserService } from './user.service';

@Module({
  providers: [UserService, UserRepository, PrismaService],
  exports: [UserService, UserRepository]
})
export class UserModule {}
