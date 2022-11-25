import { BadRequestException, Injectable } from '@nestjs/common';
import { AdminService } from '../services/admin.service';
import { LoginAdminDto } from './dto/login-admin.dto';
import { hash } from 'src/utils/hash';
import { JwtService } from '@nestjs/jwt';
import { comparePasswords } from 'src/utils/comparePass';

@Injectable()
export class AdminAuthService {
  constructor(
    private adminService: AdminService,
    private jwtService: JwtService,
  ) {}

  async adminLogin(adminPayload: LoginAdminDto) {
    const admin = await this.validateAdmin(adminPayload);
    return await this.generateToken(admin.email, admin.id);
  }

  async validateAdmin(adminPayload: LoginAdminDto) {
    const { email, password } = adminPayload;
    const admin = await this.adminService.getAdminByEmail(email);

    if (!admin) {
      throw new BadRequestException('Admin with this email does not exist');
    }

    const comparePassword = hash(password);

    if (!comparePasswords(comparePassword, admin.password)) {
      throw new BadRequestException('Wrong password');
    }
    return admin;
  }

  async generateToken(email: string, id: number) {
    const payload = { email, id, role: 'admin' };
    return this.jwtService.sign(payload);
  }
}
