import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/login-request.dto';
import { LoginStatus } from './dto/login-status.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async registerUser(@Body() createUserDto: CreateUserDto): Promise<LoginStatus>  {
        let accessToken;
        try {
            accessToken = await this.authService.register(createUserDto);
        } catch (err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST)
        }
        return {
            success: true,
            accessToken: accessToken
        }
    }

    @Post('login')
    async login(@Body() creds: LoginRequestDto): Promise<LoginStatus> {
        let accessToken;
        try {
            accessToken = await this.authService.login(creds);
        } catch (err) {
            throw new HttpException(err, HttpStatus.UNAUTHORIZED)
        }
        return {
            success: true,
            accessToken: accessToken
        }
    }
}
