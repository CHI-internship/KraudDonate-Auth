import { MailerService } from '@nestjs-modules/mailer';
import {
  NotFoundException,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { AdminService } from '../services/admin.service';
import { AdminResetPassDto } from './dto/admin-reset-pass.dto';
import { hash } from 'src/utils/hash';
import { AdminUpdatePassDto } from './dto/admin-update-pass.dto';
import { comparePasswords } from 'src/utils/comparePass';

@Injectable()
export class AdminPassService {
  constructor(
    private adminService: AdminService,
    private mailService: MailerService,
  ) {}

  async forgotPass(email: string) {
    const admin = await this.adminService.getAdminByEmail(email);
    if (!admin) {
      throw new NotFoundException('Admin with this email does not exist');
    }

    const resetUrl = `${process.env.ADMIN_FRONT_BASE}/admin/reset-password`;
    await this.mailService.sendMail({
      to: email,
      from: 'krauddonate@gmail.com',
      subject: 'Password reset for admin',
      html: resetUrl,
    });
    return `Email was sent to ${email}`;
  }

  async resetPass(resetPassDto: AdminResetPassDto) {
    const { newPassword, confirmPassword, email } = resetPassDto;
    const admin = await this.adminService.getAdminByEmail(email);

    if (!admin) {
      throw new BadRequestException('Admin does not exist');
    } else if (comparePasswords(newPassword, confirmPassword)) {
      throw new BadRequestException('Passwords do not match');
    }

    const newAdminPass = hash(newPassword);
    await this.adminService.updateAdminPassword(admin.email, newAdminPass);

    return 'Password was updated';
  }

  async updatePass(updatePassDto: AdminUpdatePassDto) {
    const { oldPassword, newPassword, newPasswordConfirm, email } =
      updatePassDto;
    const admin = await this.adminService.getAdminByEmail(email);

    const hashedOldPass = hash(oldPassword);
    const hashedNewPass = hash(newPassword);
    const hashedNewPassConfirm = hash(newPasswordConfirm);

    if (!admin) {
      throw new BadRequestException('Admin does not exist');
    } else if (comparePasswords(admin.password, hashedOldPass)) {
      throw new BadRequestException('Wrong password');
    }

    if (comparePasswords(hashedNewPass, hashedNewPassConfirm)) {
      throw new BadRequestException('Passwords do not match');
    }

    await this.adminService.updateAdminPassword(email, hashedNewPass);
    return 'Password was updated';
  }
}
