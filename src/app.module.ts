import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PasswordModule } from './password/password.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { AuthModule } from './auth/auth.module';
import { BullModule } from '@nestjs/bull';
import { UserModule } from './user/user.module';
import { AdminAuthModule } from './admin/auth/admin-auth.module';
import { AdminPassModule } from './admin/admin-password/admin-password.module';
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.sendgrid.net',
        auth: { user: 'apikey', pass: process.env.MAIL_PASSWORD },
      },
    }),
    BullModule.forRoot({
      redis: { host: 'localhost', port: 6379 },
    }),
    PasswordModule,
    AuthModule,
    UserModule,
    AdminAuthModule,
    AdminPassModule,
  ],
})
export class AppModule {}
