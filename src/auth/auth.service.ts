import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/services/users.service';
import { LoginRequestDto } from './dto/login-request.dto';
import * as bcrypt from 'bcrypt';

interface JwtPayload {
    username: string
}

@Injectable()
export class AuthService {
    private readonly logger: Logger = new Logger(AuthService.name)
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ) {};

    async register(createUserDto: CreateUserDto): Promise<string> {
        let user: User;
        try{
            user = await this.userService.create(createUserDto)
        } catch (err){
            this.logger.log(err)
            throw new Error("username already taken");
        }
        return await this.createToken(user.username);
    }

    async login(loginRequestDto: LoginRequestDto): Promise<string> {
        let user: User;
        try {
            user = await this.userService.findByUsername(loginRequestDto.username);
            const passwordMatch = await bcrypt.compare(loginRequestDto.password, user.password);
            this.logger.log(passwordMatch);
            if (!passwordMatch) {
                throw new Error("Incorrect password");
            }
        } catch (err) {
            this.logger.log(err)
            throw new Error("Incorrect credentials");
        }
        return await this.createToken(user.username)
    }

    private async createToken(username: string): Promise<string> {
        const payload: JwtPayload = {username: username};
        const accessToken: string = await this.jwtService.signAsync(payload, {expiresIn: 60*60, secret: process.env.JWT_SECRET});
        return accessToken;
    }
}
