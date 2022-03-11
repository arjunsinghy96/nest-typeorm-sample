import { CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export abstract class AbstractEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({type: "timestamp"})
    created_at: Date

    @UpdateDateColumn({type: "timestamp"})
    updated_at: Date

    @DeleteDateColumn({type: "timestamp"})
    deleted_at: Date
}