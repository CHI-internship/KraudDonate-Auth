import { Body, Controller, Post, Put } from '@nestjs/common';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { PasswordService } from './password.service';

@Controller('password')
export class PasswordController {
  constructor(private readonly passwordService: PasswordService) { }

  @Post('forgot')
  forgotPassword(@Body('email') email: string) {
    return this.passwordService.forgotPassword(email)
  }

  @Put('reset')
  resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto) {
    return this.passwordService.resetPassword(resetPasswordDto)
  }

  //add CurrentUserDecorator
  @Put('update')
  updatePassword(@Body() updatePasswordDto: UpdatePasswordDto) {
    return this.passwordService.updatePassword(updatePasswordDto)
  }
}
