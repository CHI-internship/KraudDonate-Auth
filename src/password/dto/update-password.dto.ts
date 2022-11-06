import { ApiProperty } from "@nestjs/swagger"

export class UpdatePasswordDto {
  @ApiProperty({
    example: '1',
    description: 'User id',
    uniqueItems: true
  })
  userId: number

  @ApiProperty({
    example: 'qwerty123',
    description: 'Old user password'
  })
  oldPassword: string

  @ApiProperty({
    example: 'qwerty123',
    description: 'New user password'
  })
  newPassword: string
}