import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthServiceMock, loginMock } from './mocks/auth.service.mock';

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // imports: [AuthModule, UserModule],
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useClass(AuthServiceMock)
      .compile();

    authController = module.get<AuthController>(AuthController);
  });

  it('should return access and refresh tokens', async () => {
    loginMock.mockImplementationOnce(async () => ({
      accessToken: 'random-access-token',
      refreshToken: 'random-refresh-token',
    }));

    const loginUserDto = {
      email: 'test@gmail.com',
      password: 'Test_123',
    };

    const result = await authController.login(loginUserDto);

    expect(result).toEqual({
      accessToken: expect.any(String),
      refreshToken: expect.any(String),
    });
  });
});
