import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {
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
}
