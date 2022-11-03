import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @HttpCode(201)
  async registration(@Body() userDto: CreateUserDto) {
    try {
      return this.authService.registration(userDto);
    } catch (e) {
      throw e;
    }
  }

  @Post('/signin')
  @HttpCode(201)
  async login(@Body() userDto: LoginUserDto) {
    try {
      return this.authService.login(userDto);
    } catch (e) {
      throw e;
    }
  }
}
