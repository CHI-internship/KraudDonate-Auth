import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import {
  createUserMock,
  getUserByEmailMock,
  UserServiceMock,
} from './mocks/user.service.mock';
import { JwtService } from '@nestjs/jwt';
import { JwtServiceMock, signMock } from './mocks/jwt.service.mock';
import { UserRoles } from './dto/roles.dto';

// jest.mock('crypto', () => {
//   return {
//     createHmac: jest.fn().mockReturnThis(),
//     update: jest.fn().mockReturnThis(),
//     randomFillSync: jest.fn().mockReturnThis(),
//     createHash: jest.fn().mockReturnThis(),
//     digest: jest.fn(() => 'Test_123'),
//   };
// });

describe('AuthService', () => {
  let authService: AuthService;
  process.env.ALGORITM_DECODE_PASSWORD = 'sha256';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UserService, JwtService],
    })
      .overrideProvider(UserService)
      .useClass(UserServiceMock)
      .overrideProvider(JwtService)
      .useClass(JwtServiceMock)
      .compile();

    authService = module.get<AuthService>(AuthService);
  });

  describe('Login', () => {
    it('should return access and refresh tokens', async () => {
      const loginUserDto = {
        email: 'test@gmail.com',
        password: 'Test_123',
      };

      getUserByEmailMock.mockImplementationOnce(async () => ({
        email: 'test@gmail.com',
        // hashed Test_123
        password:
          '9bc646e4613a5dd1181d2bb4d82aa8cead379b3404b7c136130a150f00a03e58',
        role: 'customer',
      }));

      signMock.mockImplementation(async () => 'random-token');

      const result = await authService.login(loginUserDto);

      expect(result).toEqual({
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
      });
    });

    it('should throw BadRequestException "Wrong email"', async () => {
      const loginUserDto = {
        email: 'test@gmail.com',
        password: 'Test_123',
      };

      getUserByEmailMock.mockImplementationOnce(async () => undefined);

      signMock.mockImplementation(async () => 'random-token');

      try {
        const res = await authService.login(loginUserDto);
      } catch (err) {
        expect(err.message).toBe('Wrong email');
      }
    });

    it('should throw BadRequestException "Wrong password"', async () => {
      const loginUserDto = {
        email: 'test@gmail.com',
        password: 'Test_123456789',
      };

      getUserByEmailMock.mockImplementationOnce(async () => ({
        email: 'test@gmail.com',
        // hashed Test_123
        password:
          '9bc646e4613a5dd1181d2bb4d82aa8cead379b3404b7c136130a150f00a03e58',
        role: 'customer',
      }));

      signMock.mockImplementation(async () => 'random-token');

      try {
        const res = await authService.login(loginUserDto);
      } catch (err) {
        expect(err.message).toBe('Wrong password');
      }
    });
  });

  describe('Registration', () => {
    it('should create user and return access and refresh tokens', async () => {
      const createUserDto = {
        email: 'test@gmail.com',
        password: 'Test_123',
        role: UserRoles.Customer,
      };

      getUserByEmailMock.mockImplementationOnce(async () => undefined);

      createUserMock.mockImplementationOnce(async () => ({
        email: 'test@gmail.com',
        password: 'Test_123',
        role: UserRoles.Customer,
      }));

      signMock.mockImplementation(async () => 'random-token');

      const result = await authService.registration(createUserDto);

      expect(result).toEqual({
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
      });
    });

    it('should throw BadRequestException "User with this email test@gmail.com has already exist"', async () => {
      const createUserDto = {
        email: 'test@gmail.com',
        password: 'Test_123',
        role: UserRoles.Customer,
      };

      getUserByEmailMock.mockImplementationOnce(async () => ({
        email: 'test@gmail.com',
        password: 'Test_123',
        role: UserRoles.Customer,
      }));

      createUserMock.mockImplementationOnce(async () => ({
        email: 'test@gmail.com',
        password: 'Test_123',
        role: UserRoles.Customer,
      }));

      signMock.mockImplementation(async () => 'random-token');

      try {
        const res = await authService.registration(createUserDto);
      } catch (err) {
        expect(err.message).toBe(
          'User with this email test@gmail.com has already exist',
        );
      }
    });
  });

  describe('Refresh', () => {
    it('should return access and refresh tokens', async () => {
      const refreshTokenDto = {
        email: 'test@gmail.com',
        role: UserRoles.Customer,
      };

      signMock.mockImplementation(async () => 'random-token');

      const result = await authService.refreshTokens(refreshTokenDto);

      expect(result).toEqual({
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
      });
    });
  });
});
