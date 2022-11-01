export class UserDto {
  id: number;
  email: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(model) {
    this.id = model.id;
    this.email = model.email;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
  }
}
