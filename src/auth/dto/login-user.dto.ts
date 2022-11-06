import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {
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
}
