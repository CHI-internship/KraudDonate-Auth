import { Body, Controller, Post, Patch, UsePipes } from '@nestjs/common';
import { EmailDto } from 'src/password/dto/email.dto';
import {
  ResetAdmPassSchema,
  UpdateAdmPassSchema,
} from 'src/utils/validator/admin-password';
import { EmailSchema } from 'src/utils/validator/admin-password/email.schema';
import { AjvValidationPipe } from 'src/utils/validator/validation';
import { AdminPassService } from './admin-password.service';
import { AdminResetPassDto } from './dto/admin-reset-pass.dto';
import { AdminUpdatePassDto } from './dto/admin-update-pass.dto';

@Controller('admin/password')
export class AdminPassController {
  constructor(private readonly adminService: AdminPassService) {}

  @Post('forgot')
  @UsePipes(new AjvValidationPipe(EmailSchema))
  forgotAdminPass(@Body() { email }: EmailDto) {
    return this.adminService.forgotPass(email);
  }

  @Patch('reset')
  @UsePipes(new AjvValidationPipe(ResetAdmPassSchema))
  resetAdminPass(@Body() resetPassPayload: AdminResetPassDto) {
    return this.adminService.resetPass(resetPassPayload);
  }

  @Patch('update')
  @UsePipes(new AjvValidationPipe(UpdateAdmPassSchema))
  updateAdminPass(@Body() updatePassPayload: AdminUpdatePassDto) {
    return this.adminService.updatePass(updatePassPayload);
  }
}
