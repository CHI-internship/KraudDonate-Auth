import Repository from "src/repository/repository";


export default class UserRepository extends Repository {
  async getUserByEmail(email: string) {
    const user = await this.prismaService.user.findFirst({
      where: { email },
    });
    
    return user;
  }

  async create(email: string, password: string, role) {
    const user = await this.prismaService.user.create({
      data: {
        email,
        password,
        role,
      },
    });

    return user;
  }

  async updatePassword(id: number, password: string) {
    const user = await this.prismaService.user.update({
      where: {id: id},
      data: {password: password}
    })

    return user;
  }

  async getUserById(id: number) {
    const user = await this.prismaService.user.findFirst({
      where: {id: id}
    })

    return user;
  }
}