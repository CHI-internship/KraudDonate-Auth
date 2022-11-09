import { Queue } from 'bull';
import { hash } from 'src/utils/hash';
import { AuthService } from 'src/auth/auth.service';
import { MailerService } from '@nestjs-modules/mailer';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { PrismaService } from 'src/services/prisma.service';
import { RESET_TEMP } from 'src/templates/reset-password';
import { InjectQueue } from '@nestjs/bull';
import {
    BadRequestException, HttpException, HttpStatus,
    Injectable, NotFoundException
} from '@nestjs/common';


@Injectable()
export class PasswordService {
    constructor(
        private prisma: PrismaService,
        private mailService: MailerService,
        private authService: AuthService,
        @InjectQueue('reset') private readonly resetQueue: Queue) { }

    async forgotPassword(email: string) {
        const user = await this.prisma.user.findFirst({ where: { email } })
            .catch(() => { throw new NotFoundException('No user found with this email.') })
        if (!user) throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

        const resetToken = await this.authService.generateToken(user.email, user.role)
        await this.prisma.tokens.create({
            data: {
                user_id: user.id,
                resetToken,
                expiredAt: (new Date().getDate() +
                    Number(process.env.RESET_TOKEN_EXPIRE!)).toString()
            }
        }).then(async (data) =>
            await this.resetQueue.add('delResetToken', data.id, { delay: 604800000 }))

        const resetUrl = `${process.env.MAIN_FRONT_BASE}/reset?resetToken=${resetToken}`
        await this.mailService.sendMail({
            to: email,
            from: 'krauddonate@gmail.com',
            subject: 'Password reset',
            html: RESET_TEMP(resetUrl)
        })

        return { success: true }
    }


    async resetPassword(resetPasswordDto: ResetPasswordDto) {
        if (resetPasswordDto.newPassword !== resetPasswordDto.newPasswordConfirm)
            throw new BadRequestException('Passwords do not match.')

        const token = await this.prisma.tokens.findFirst({
            where: { resetToken: resetPasswordDto.resetToken, usedAt: null }
        }).catch((err) => { throw new BadRequestException(err) })

        if (!token) throw new HttpException('Token not found', HttpStatus.BAD_REQUEST)

        const hashedNewPassword = hash(resetPasswordDto.newPassword)
        await this.prisma.user.update({
            where: { id: token.user_id },
            data: { password: hashedNewPassword }
        })

        await this.prisma.tokens.update({
            where: { resetToken: resetPasswordDto.resetToken },
            data: { usedAt: new Date().getDate().toString() }
        })

        return { success: true }
    }


    async updatePassword(updatePasswordDto: UpdatePasswordDto) {
        const user = await this.prisma.user.findFirst({
            where: { id: updatePasswordDto.userId }
        })

        const compareOldPassword = hash(updatePasswordDto.oldPassword)

        if (!user) {
            throw new BadRequestException('User not found.')
        } else if (compareOldPassword !== user.password) {
            throw new BadRequestException('Old password was entered incorrectly.')
        }

        const hashedNewPassword = hash(updatePasswordDto.newPassword)
        await this.prisma.user.update({
            where: { id: updatePasswordDto.userId },
            data: { password: hashedNewPassword }
        })

        return { success: true }
    }
}

