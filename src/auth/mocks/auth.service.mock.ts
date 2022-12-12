export class AuthServiceMock {
  login = loginMock;
}

export const loginMock = jest.fn();
