import { BadRequestException, Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/login-request.dto';
import { LoginStatus } from './dto/login-status.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async registerUser(@Body() createUserDto: CreateUserDto): Promise<LoginStatus>  {
        let accessToken;
        try {
            accessToken = await this.authService.register(createUserDto);
        } catch (err) {
            throw new BadRequestException("username already taken")
        }
        return {
            accessToken: accessToken
        }
    }

    @Post('login')
    async login(@Body() creds: LoginRequestDto): Promise<LoginStatus> {
        let accessToken;
        try {
            accessToken = await this.authService.login(creds);
        } catch (err) {
            console.log(err)
            throw new UnauthorizedException("bad credentials")
        }
        return {
            accessToken: accessToken
        }
    }
}
