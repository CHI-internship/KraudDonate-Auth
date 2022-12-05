import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { RefreshTokensDto } from './dto/refresh-tokens.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async registration(userDto: CreateUserDto) {
    const { email, password, role } = userDto;

    const candidate = await this.usersService.getUserByEmail(email);

    if (candidate) {
      throw new BadRequestException(
        `User with this email  ${email} has already exist`,
      );
    }

    const hashedPassword = crypto
      .createHmac(process.env.ALGORITM_DECODE_PASSWORD!, password)
      .update(password)
      .digest('hex');

    const user = await this.usersService.createUser(
      email,
      hashedPassword,
      role,
    );

    const accessToken = await this.generateToken(email, role, {
      expiresIn: '1d',
    });
    const refreshToken = await this.generateToken(email, role, {
      expiresIn: '2d',
    });

    return { accessToken, refreshToken };
  }

  async login(userDto: LoginUserDto) {
    const user = await this.validateUser(userDto);

    const accessToken = await this.generateToken(user.email, user.role, {
      expiresIn: '1d',
    });
    const refreshToken = await this.generateToken(user.email, user.role, {
      expiresIn: '2d',
    });
    return { accessToken, refreshToken };
  }

  async refreshTokens(refreshTokensDto: RefreshTokensDto) {
    const { email, role } = refreshTokensDto;

    const accessToken = await this.generateToken(email, role, {
      expiresIn: '2d',
    });
    const refreshToken = await this.generateToken(email, role, {
      expiresIn: '2d',
    });
    return { accessToken, refreshToken };
  }

  private async validateUser(userDto: LoginUserDto) {
    const { email, password } = userDto;

    const user = await this.usersService.getUserByEmail(email);

    if (!user) {
      throw new BadRequestException('Wrong email');
    }

    const comparePassword = crypto
      .createHmac(process.env.ALGORITM_DECODE_PASSWORD!, password)
      .update(password)
      .digest('hex');

    if (comparePassword !== user.password) {
      throw new BadRequestException('Wrong password');
    }

    return user;
  }

  async generateToken(email: string, role: string, config: JwtSignOptions) {
    const payload = { email, role };
    return this.jwtService.sign(payload, config);
  }
}
