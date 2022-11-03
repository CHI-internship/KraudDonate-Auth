import { Body, Controller, Patch, Post } from '@nestjs/common';
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

  @Patch('reset')
  resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto) {
    return this.passwordService.resetPassword(resetPasswordDto)
  }

  @Patch('update')
  updatePassword(@Body() updatePasswordDto: UpdatePasswordDto) {
    return this.passwordService.updatePassword(updatePasswordDto)
  }
}
