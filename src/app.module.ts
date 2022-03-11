import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'arjun.yadav',
      password: 'awesome_password',
      database: 'test',
      autoLoadEntities: true,
      synchronize: false,
      entities: [
        'src/**/*.entity.ts'
      ],
      migrations: ['src/migraitons/**/*.ts'],
      cli: {
        migrationsDir: 'src/migrations'
      }
    }),
    UsersModule,
    CommonModule,
  ],
})
export class AppModule {}
