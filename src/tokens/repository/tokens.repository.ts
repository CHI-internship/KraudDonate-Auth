import { BadRequestException } from "@nestjs/common";
import Repository from "src/repository/repository";

export default class TokensRepository extends Repository {
  async create(id: number, resetToken: string) {
    const token = await this.prismaService.tokens.create({
      data: {
        user_id: id,
        resetToken,
      }
    })

    return token;
  }

  async getToken(resetToken: string) {
    const token = await this.prismaService.tokens.findFirst({
      where: {resetToken: resetToken, usedAt: null}
    }).catch((err) => {
      throw new BadRequestException(err);
    })

    return token;
  }

  async update(resetToken: string) {
    const token = await this.prismaService.tokens.update({
      where: {resetToken: resetToken},
      data: {usedAt: new Date().toISOString()}
    })

    return token;
  }
}