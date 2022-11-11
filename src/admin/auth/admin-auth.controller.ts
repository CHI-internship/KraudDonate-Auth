import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';
import { LoginAdminDto } from './dto/login-admin.dto';

@Controller('admin/auth')
export class AdminAuthController {
  constructor(private adminAuthService: AdminAuthService) {}

  @Post('sign-in')
  @HttpCode(201)
  async adminLogin(@Body() adminPayload: LoginAdminDto) {
    return this.adminAuthService.adminLogin(adminPayload);
  }
}
