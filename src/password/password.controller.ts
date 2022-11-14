import { Body, Controller, Patch, Post, UsePipes } from '@nestjs/common';
import { ResetPasswordSchema, UpdatePasswordSchema } from 'src/utils/validator/password';
import { AjvValidationPipe } from 'src/utils/validator/validation';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { PasswordService } from './password.service';
import { EmailDto } from './dto/email.dto';
import { EmailShema } from 'src/utils/validator/password/email.schema';

@Controller('password')
export class PasswordController {
  constructor(private readonly passwordService: PasswordService) { }

  @Post('forgot')
  @UsePipes(new AjvValidationPipe(EmailShema))
  forgotPassword(@Body() emailDto: EmailDto) {
    return this.passwordService.forgotPassword(emailDto.email);
  }

  @Patch('reset')
  @UsePipes(new AjvValidationPipe(ResetPasswordSchema))
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.passwordService.resetPassword(resetPasswordDto)
  }

  @Patch('update')
  @UsePipes(new AjvValidationPipe(UpdatePasswordSchema))
  updatePassword(@Body() updatePasswordDto: UpdatePasswordDto) {
    return this.passwordService.updatePassword(updatePasswordDto)
  }
}
