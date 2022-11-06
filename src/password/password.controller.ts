import { Body, Controller, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { PasswordService } from './password.service';

@ApiTags('Operations with password')
@Controller('password')
export class PasswordController {
  constructor(private readonly passwordService: PasswordService) { }

  @ApiOperation({ summary: 'Forgot password' })
  @ApiResponse({ status: 201 })
  @Post('forgot')
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.passwordService.forgotPassword(forgotPasswordDto)
  }

  @ApiOperation({ summary: 'Reset password' })
  @ApiResponse({ status: 201 })
  @Patch('reset')
  resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto) {
    return this.passwordService.resetPassword(resetPasswordDto)
  }

  @ApiOperation({ summary: 'Update password' })
  @ApiResponse({ status: 201 })
  @Patch('update')
  updatePassword(@Body() updatePasswordDto: UpdatePasswordDto) {
    return this.passwordService.updatePassword(updatePasswordDto)
  }
}
