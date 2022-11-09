import { Injectable } from '@nestjs/common';
import UserRepository from './repository/user.repository';


@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUserByEmail(email: string) {
    const user = await this.userRepository.getUserByEmail(email);

    return user;
  }

  async getUserById(id: number) {
    const user = await this.userRepository.getUserById(id);

    return user;
  }

  async createUser(email: string, password: string, role) {
    const user = await this.userRepository.create(email, password, role);

    return user;
  }
  
  async updateUserPassword(id: number, password: string) {
    const user = await this.userRepository.updatePassword(id, password);

    return user;
  }
}
