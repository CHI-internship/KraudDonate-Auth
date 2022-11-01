import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {PrismaService} from "./prisma.service";
import { PasswordModule } from './password/password.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    PasswordModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
