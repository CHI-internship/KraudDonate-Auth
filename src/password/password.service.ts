import { PrismaService } from 'src/prisma.service';
import { mailTransporter } from 'nodemailer/nodemailer';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { RESET_HTML_TEMPLATE } from 'nodemailer/templates/reset-password.template';


@Injectable()
export class PasswordService {
    constructor(private prisma: PrismaService) { }

    async forgotPassword(email: string) {
        const resetToken = Math.random().toString(); //replace with real token
        await this.prisma.user.update({
            where: { email }, data: { resetToken }
        }).catch(() => {
            throw new NotFoundException('No user found with this email.')
        })

        const resetUrl = `http://localhost:${process.env.PORT}/reset/?resetToken=${resetToken}`
        await mailTransporter.sendMail({
            from: "krauddonate@gmail.com",
            to: email,
            subject: "Password reset",
            html: RESET_HTML_TEMPLATE(resetUrl),
        })
        return 'Please check your email.'
    }


    async resetPassword(resetPasswordDto: ResetPasswordDto) {
        if (resetPasswordDto.newPassword !== resetPasswordDto.newPasswordConfirm) {
            throw new BadRequestException('Passwords do not match.')
        }

        await this.prisma.user.update({
            where: { resetToken: resetPasswordDto.resetToken },
            data: { password: resetPasswordDto.newPassword, resetToken: null },
        }).catch(() => {
            throw new BadRequestException('Something went wrong.')
        })

        return 'Successfully updated.'
    }


    async updatePassword(updatePasswordDto: UpdatePasswordDto) {
        const user = await this.prisma.user.findFirst({
            where: { id: updatePasswordDto.userId }
        })

        if (!user) {
            throw new BadRequestException('User not found.')
        }
        else if (updatePasswordDto.oldPassword !== user.password) {
            throw new BadRequestException('Old password was entered incorrectly.')
        }

        // add hash
        await this.prisma.user.update({
            where: { id: updatePasswordDto.userId },
            data: { password: updatePasswordDto.newPassword }
        })

        return 'Successfully updated.'
    }
}

