import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Logger,
  Req,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { User } from "./entities/user.entity";
import { UsersService } from "./services/users.service";
import {Request} from "express";

type UserData = {
  id?: number
  username: string
}

@ApiTags("users")
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@Controller("users")
@UseGuards(AuthGuard("jwt"))
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  private readonly logger: Logger = new Logger(UsersController.name)

  @Get("self")
  findOne(@Req() req: Request): User | PromiseLike<User> {
    const user = req.user as UserData;
    return this.usersService.findByUsername(user.username);
  }
}
