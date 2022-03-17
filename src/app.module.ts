import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
// import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: false,
      autoLoadEntities: true,
      entities: [
        'dist/**/*.entity.ts'
      ],
      migrations: ['src/migraitons/**/*.ts'],
      cli: {
        migrationsDir: 'src/migrations'
      }
    }),
    UsersModule,
    // CommonModule,
    AuthModule,
    PostsModule,
  ],
})
export class AppModule {}
