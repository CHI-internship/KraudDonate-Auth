import { ApiProperty } from "@nestjs/swagger"

export class ResetPasswordDto {
  @ApiProperty({
    example: 'eyJhbGciO.eyJhbGciO.eyJhbGciO',
    description: 'Reset token from link',
    type: String
  })
  resetToken: string

  @ApiProperty({
    example: 'qwerty123',
    description: 'New user password',
    type: String
  })
  newPassword: string

  @ApiProperty({
    example: 'qwerty123',
    description: 'Confirm new user password',
    type: String
  })
  newPasswordConfirm: string
}