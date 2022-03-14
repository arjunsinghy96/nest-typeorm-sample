import { ApiProperty } from "@nestjs/swagger"

export class LoginStatus {
    success?: boolean

    @ApiProperty()
    accessToken: string
}