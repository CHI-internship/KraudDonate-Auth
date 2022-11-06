import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @ApiOperation({ summary: 'Sign up user' })
  @ApiResponse({
    status: 201,
    description: 'Access token',
    type: String
  })
  @Post('/signup')
  @HttpCode(201)
  async registration(@Body() userDto: CreateUserDto) {
    try {
      return this.authService.registration(userDto);
    } catch (e) {
      throw e;
    }
  }


  @ApiOperation({ summary: 'Sign in user' })
  @ApiResponse({
    status: 201,
    description: 'Access token',
    type: String
  })
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
