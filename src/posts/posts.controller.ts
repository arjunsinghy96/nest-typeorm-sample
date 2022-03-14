import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { Posts } from './posts.entity';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor( private readonly postsService: PostsService) {};

    @Get()
    async getAllPosts(): Promise<Posts[]> {
        return this.postsService.getAllPosts();
    }

    @Get(":id")
    async getPost(@Param("id") id: string): Promise<Posts> {
        return this.postsService.findOne(Number(id))
    }

    @Get(":id/comments")
    async getComments(@Param("id") id: number): Promise<Posts[]> {
        return this.postsService.findComments(id);
    }

    @Post()
    async createPost(@Body() createPostDto: CreatePostDto): Promise<Posts> {
        return this.postsService.createPost(createPostDto);
    }

    @Post(":id/comments")
    async createComment(@Param("id") id: number, @Body() createPostDto: CreatePostDto): Promise<Posts> {
        return this.postsService.createComment(id, createPostDto)
    }



}
