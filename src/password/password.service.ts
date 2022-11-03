import { PrismaService } from 'src/prisma.service';
import { MailerService } from '@nestjs-modules/mailer';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';


@Injectable()
export class PasswordService {
    constructor(private prisma: PrismaService,
        private mailService: MailerService) { }

    async all() {
        return this.prisma.user.findMany()
    }

    async forgotPassword(email: string) {
        const resetToken = Math.random().toString()

        const user = await this.prisma.user.findFirst({ where: { email } })
            .catch(() => {
                throw new NotFoundException('No user found with this email.')
            })

        await this.prisma.tokens.upsert({
            where: { user_id: user.id },
            update: { resetToken },
            create: { user_id: user.id, resetToken },
        })

        const resetUrl = `http://localhost:${process.env.PORT}/reset/?resetToken=${resetToken}`
        await this.mailService.sendMail({
            to: email,
            from: 'krauddonate@gmail.com',
            subject: 'Password reset',
            template: './reset-password',
            context: { resetUrl }
        })

        return { success: true }
    }


    async resetPassword(resetPasswordDto: ResetPasswordDto) {
        if (resetPasswordDto.newPassword !== resetPasswordDto.newPasswordConfirm) {
            throw new BadRequestException('Passwords do not match.')
        }

        const token = await this.prisma.tokens.findFirst({
            where: { resetToken: resetPasswordDto.resetToken },
        }).catch((err) => { throw new BadRequestException(err) })

        await this.prisma.user.update({
            where: { id: token.user_id },
            data: { password: resetPasswordDto.newPassword }
        })

        return { success: true }
    }


    async updatePassword(updatePasswordDto: UpdatePasswordDto) {
        const user = await this.prisma.user.findFirst({
            where: { id: updatePasswordDto.userId }
        })

        if (!user) {
            throw new BadRequestException('User not found.')
        } else if (updatePasswordDto.oldPassword !== user.password) {
            throw new BadRequestException('Old password was entered incorrectly.')
        }

        await this.prisma.user.update({
            where: { id: updatePasswordDto.userId },
            data: { password: updatePasswordDto.newPassword }
        })

        return { success: true }
    }
}

