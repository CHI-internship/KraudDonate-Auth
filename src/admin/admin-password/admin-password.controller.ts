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
  resetAdminPass(@Body() resetPassDto: AdminResetPassDto) {
    return this.adminService.resetPass(resetPassDto);
  }

  @Patch('update')
  updateAdminPass(@Body() updatePassDto: AdminUpdatePassDto) {
    return this.adminService.updatePass(updatePassDto);
  }
}
