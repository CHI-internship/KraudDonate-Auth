import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { AjvValidationPipe } from 'src/utils/validator/validation';
import { CreateUserSchema, LoginUserSchema } from 'src/utils/validator/user';
import { RefreshTokensDto } from './dto/refresh-tokens.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @HttpCode(201)
  @UsePipes(new AjvValidationPipe(CreateUserSchema))
  async registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }

  @Post('/signin')
  @HttpCode(201)
  @UsePipes(new AjvValidationPipe(LoginUserSchema))
  async login(@Body() userDto: LoginUserDto) {
    return this.authService.login(userDto);
  }

  @Post('/refresh-tokens')
  @HttpCode(201)
  async refreshTokens(@Body() refreshTokensDto: RefreshTokensDto) {
    return this.authService.refreshTokens(refreshTokensDto);
  }
}
