import { Body, Controller, Post, Patch } from '@nestjs/common';
import { AdminPassService } from './admin-password.service';
import { AdminResetPassDto } from './dto/admin-reset-pass.dto';
import { AdminUpdatePassDto } from './dto/admin-update-pass.dto';

@Controller('admin/password')
export class AdminPassController {
  constructor(private adminService: AdminPassService) {}

  @Post('forgot')
  forgotAdminPass(@Body('email') email: string) {
    return this.adminService.forgotPass(email);
  }

  @Patch('reset')
  resetAdminPass(@Body() resetPassPayload: AdminResetPassDto) {
    return this.adminService.resetPass(resetPassPayload);
  }

  @Patch('update')
  updateAdminPass(@Body() updatePassPayload: AdminUpdatePassDto) {
    return this.adminService.updatePass(updatePassPayload);
  }
}
