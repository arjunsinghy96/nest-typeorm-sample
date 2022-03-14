import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Posts, PostType } from './posts.entity';

@Injectable()
export class PostsService {

    constructor(
        @InjectRepository(Posts)
        private readonly postsRepository: Repository<Posts>
    ) {};

    async createPost(createPostDto: CreatePostDto): Promise<Posts> {
        const post = new Posts();
        post.content = createPostDto.content;
        post.post_type = PostType.post;
        return this.postsRepository.save(post)
    }

    async createComment(parentId: number, createCommentDto: CreatePostDto): Promise<Posts> {
        const post = new Posts()
        post.id = parentId;
        const comment = new Posts();
        comment.content = createCommentDto.content;
        comment.post_type = PostType.comment;
        comment.parent = post

        return this.postsRepository.save(comment);
    }

    async getAllPosts(): Promise<Posts[]> {
        return this.postsRepository.find();
    }

    async findOne(id: number): Promise<Posts> {
        return this.postsRepository.findOne(id, {relations: ["comments"]});
    }

    async findComments(id: number): Promise<Posts[]> {
        const post = new Posts();
        post.id = id;
        return this.postsRepository.find({parent: post})
    }
}
