import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PasswordModule } from './password/password.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.sendgrid.net',
        auth: { user: 'apikey', pass: process.env.MAIL_PASSWORD }
      },
      template: {
        dir: join(__dirname, '..', 'templates'),
        adapter: new HandlebarsAdapter(),
        options: { strict: true },
      },
    }),
    PasswordModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }