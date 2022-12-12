import Repository from '../../repository/repository';

export default class UserRepository extends Repository {
  async getUserByEmail(email: string) {
    const user = await this.prismaService.user
      .findFirst({
        where: { email },
      })
      .catch((e) => {
        throw new Error(e);
      });

    return user;
  }

  async create(email: string, password: string, role) {
    const user = await this.prismaService.user
      .create({
        data: {
          email,
          password,
          role,
        },
      })
      .catch((e) => {
        throw new Error(e);
      });

    return user;
  }

  async updatePassword(id: number, password: string) {
    const user = await this.prismaService.user
      .update({
        where: { id: id },
        data: { password: password },
      })
      .catch((e) => {
        throw new Error(e);
      });

    return user;
  }

  async getUserById(id: number) {
    const user = await this.prismaService.user
      .findFirst({
        where: { id: id },
      })
      .catch((e) => {
        throw new Error(e);
      });

    return user;
  }
}
