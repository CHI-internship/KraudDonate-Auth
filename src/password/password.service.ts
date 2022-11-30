import { Queue } from 'bull';
import { hash } from 'src/utils/hash';
import { AuthService } from 'src/auth/auth.service';
import { MailerService } from '@nestjs-modules/mailer';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { RESET_TEMP } from 'src/templates/reset-password';
import { InjectQueue } from '@nestjs/bull';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import TokensRepository from 'src/tokens/repository/tokens.repository';

@Injectable()
export class PasswordService {
  constructor(
    private mailService: MailerService,
    private authService: AuthService,
    private userService: UserService,
    private tokensRepository: TokensRepository,
    @InjectQueue('reset') private readonly resetQueue: Queue,
  ) {}

  async forgotPassword(email: string) {
    const user = await this.userService.getUserByEmail(email).catch(() => {
      throw new NotFoundException('No user found with this email.');
    });

    if (!user)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

    const resetToken = await this.authService.generateToken(
      user.email,
      user.role,
      { expiresIn: '1d' },
    );

    await this.tokensRepository.create(user.id, resetToken).then(
      async (data) =>
        await this.resetQueue.add('updateDate', data.id, {
          delay: 604800000,
        }),
    );

    const resetUrl = `${process.env.MAIN_FRONT_BASE}/reset?resetToken=${resetToken}`;

    await this.mailService.sendMail({
      to: email,
      from: 'krauddonate@gmail.com',
      subject: 'Password reset',
      html: RESET_TEMP(resetUrl),
    });

    return { success: true };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    if (resetPasswordDto.newPassword !== resetPasswordDto.newPasswordConfirm) {
      throw new BadRequestException('Passwords do not match.');
    }

    const token = await this.tokensRepository.getToken(
      resetPasswordDto.resetToken,
    );

    if (!token)
      throw new HttpException('Token not found', HttpStatus.BAD_REQUEST);

    const hashedNewPassword = hash(resetPasswordDto.newPassword);

    await this.userService.updateUserPassword(token.user_id, hashedNewPassword);

    await this.tokensRepository.update(resetPasswordDto.resetToken);

    return { success: true };
  }

  async updatePassword(updatePasswordDto: UpdatePasswordDto) {
    const user = await this.userService.getUserById(updatePasswordDto.userId);

    const compareOldPassword = hash(updatePasswordDto.oldPassword);

    if (!user) {
      throw new BadRequestException('User not found.');
    } else if (compareOldPassword !== user.password) {
      throw new BadRequestException('Old password was entered incorrectly.');
    }

    const hashedNewPassword = hash(updatePasswordDto.newPassword);

    await this.userService.updateUserPassword(
      updatePasswordDto.userId,
      hashedNewPassword,
    );

    return { success: true };
  }
}
