import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({
    example: 'email@gmail.com',
    description: 'User email',
    uniqueItems: true
  })
  email: string;

  @ApiProperty({
    example: 'qwerty123',
    description: 'User password'
  })
  password: string;

  @ApiProperty({
    example: 'customer',
    description: 'User role',
    enum: ['customer', 'volunteer', 'admin'],
    default: 'customer'
  })
  role?: string;
}