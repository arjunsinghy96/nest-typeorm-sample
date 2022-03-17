import { Body, Controller, Get, Logger, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { Posts } from './posts.entity';
import { PostsService } from './posts.service';
import {Request} from 'express'

@ApiTags('posts')
@ApiBearerAuth()
@Controller('posts')
@UseGuards(AuthGuard('jwt'))
export class PostsController {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor( private readonly postsService: PostsService) {};

    private readonly logger = new Logger(PostsController.name)

    @Get()
    async getAllPosts(@Req() req: Request): Promise<Posts[]> {
        this.logger.log(req);
        return this.postsService.getAllPosts();
    }

    @Get(":id")
    async getPost(@Param("id") id: number): Promise<Posts> {
        return this.postsService.findOne(id)
    }

    @Get(":id/comments")
    async getComments(@Param("id") id: number): Promise<Posts[]> {
        return this.postsService.findComments(id);
    }

    @Post()
    async createPost(@Body("id") createPostDto: CreatePostDto): Promise<Posts> {
        return this.postsService.createPost(createPostDto);
    }

    @Post(":id/comments")
    async createComment(@Param("id") id: number, @Body() createPostDto: CreatePostDto): Promise<Posts> {
        return this.postsService.createComment(id, createPostDto)
    }



}
