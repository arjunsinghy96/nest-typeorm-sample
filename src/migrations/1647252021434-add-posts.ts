import {MigrationInterface, QueryRunner} from "typeorm";

export class addPosts1647252021434 implements MigrationInterface {
    name = 'addPosts1647252021434'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."posts_post_type_enum" AS ENUM('post', 'comment')
        `);
        await queryRunner.query(`
            CREATE TABLE "posts" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "content" text NOT NULL,
                "post_type" "public"."posts_post_type_enum" NOT NULL DEFAULT 'post',
                "parentId" integer,
                CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "posts"
            ADD CONSTRAINT "FK_070218af41a90b3a4522d8a70b4" FOREIGN KEY ("parentId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "posts" DROP CONSTRAINT "FK_070218af41a90b3a4522d8a70b4"
        `);
        await queryRunner.query(`
            DROP TABLE "posts"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."posts_post_type_enum"
        `);
    }

}
