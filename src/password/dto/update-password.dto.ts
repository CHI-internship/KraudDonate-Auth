import { ApiProperty } from "@nestjs/swagger"

export class UpdatePasswordDto {
  @ApiProperty({
    example: '1',
    description: 'User id',
    uniqueItems: true,
    type: Number
  })
  userId: number

  @ApiProperty({
    example: 'qwerty123',
    description: 'Old user password',
    type: String
  })
  oldPassword: string

  @ApiProperty({
    example: 'qwerty123',
    description: 'New user password',
    type: String
  })
  newPassword: string
}