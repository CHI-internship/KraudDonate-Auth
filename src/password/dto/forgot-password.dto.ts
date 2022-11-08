import { ApiProperty } from "@nestjs/swagger"

export class ForgotPasswordDto {
    @ApiProperty({
        example: 'user@gmail.com',
        description: 'User email',
        uniqueItems: true,
        type: String
    })
    email: string
}