import { ApiProperty } from "@nestjs/swagger"

export class ResetPasswordDto {
  @ApiProperty({
    example: 'eyJhbGciO.eyJhbGciO.eyJhbGciO',
    description: 'Reset token from link'
  })
  resetToken: string

  @ApiProperty({
    example: 'qwerty123',
    description: 'New user password'
  })
  newPassword: string

  @ApiProperty({
    example: 'qwerty123',
    description: 'Confirm new user password'
  })
  newPasswordConfirm: string
}