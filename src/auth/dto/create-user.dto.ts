import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({
    example: 'email@gmail.com',
    description: 'User email',
    uniqueItems: true,
    type: String
  })
  email: string;

  @ApiProperty({
    example: 'qwerty123',
    description: 'User password',
    type: String
  })
  password: string;

  @ApiProperty({
    example: 'customer',
    description: 'User role',
    enum: ['customer', 'volunteer', 'admin'],
    default: 'customer',
    type: String
  })
  role?: string;
}