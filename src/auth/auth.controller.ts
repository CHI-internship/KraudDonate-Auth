import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { AjvValidationPipe } from 'src/utils/validator/validation';
import { CreateUserSchema, LoginUserSchema } from 'src/utils/validator/user';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @HttpCode(201)
  @UsePipes(new AjvValidationPipe(CreateUserSchema))
  async registration(@Body() userDto: CreateUserDto) {
    try {
      return this.authService.registration(userDto);
    } catch (e) {
      throw e;
    }
  }

  @Post('/signin')
  @HttpCode(201)
  @UsePipes(new AjvValidationPipe(LoginUserSchema))
  async login(@Body() userDto: LoginUserDto) {
    try {
      return this.authService.login(userDto);
    } catch (e) {
      throw e;
    }
  }
}
