import { ApiProperty } from "@nestjs/swagger"

export class CreateProfileDto {
    @ApiProperty()
    firstName: string

    @ApiProperty()
    lastName: string
}