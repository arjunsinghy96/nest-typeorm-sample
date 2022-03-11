import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

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
      synchronize: true,
    }),
    UsersModule,
  ],
})
export class AppModule {}
