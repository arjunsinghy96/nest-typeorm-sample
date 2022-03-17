import { Injectable, Logger } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

type Payload = {
    username: string
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    private readonly logger: Logger = new Logger(JwtStrategy.name);
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET
        })
        this.logger.log(process.env.JWT_SECRET);
    }

    async validate(payload: Payload): Promise<any> {
        return {username: payload.username}
    }
}