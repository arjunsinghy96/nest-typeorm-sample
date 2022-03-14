import { AbstractEntity } from "../common/base.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

export enum PostType {
    post = "post",
    comment = "comment"
}

@Entity()
export class Posts extends AbstractEntity {

    @Column({
        type: "text",
        nullable: false,
    })
    content: string

    @Column({
        type: "enum",
        enum: PostType,
        default: PostType.post
    })
    post_type: PostType

    @ManyToOne(() => Posts, post => post.comments)
    parent: Posts

    parentId: number

    @OneToMany(() => Posts, post => post.parent)
    comments: Posts[]
}