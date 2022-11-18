import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common';
import { LoginAdminSchema } from 'src/utils/validator/admin/loginAdmin.schema';
import { AjvValidationPipe } from 'src/utils/validator/validation';
import { AdminAuthService } from './admin-auth.service';
import { LoginAdminDto } from './dto/login-admin.dto';

@Controller('admin/auth')
export class AdminAuthController {
  constructor(private adminAuthService: AdminAuthService) {}

  @Post('sign-in')
  @HttpCode(201)
  @UsePipes(new AjvValidationPipe(LoginAdminSchema))
  async adminLogin(@Body() adminPayload: LoginAdminDto) {
    return this.adminAuthService.adminLogin(adminPayload);
  }
}
