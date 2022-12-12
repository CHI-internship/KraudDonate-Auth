export class UserServiceMock {
  getUserByEmail = getUserByEmailMock;
  createUser = createUserMock;
}

export const getUserByEmailMock = jest.fn();
export const createUserMock = jest.fn();
