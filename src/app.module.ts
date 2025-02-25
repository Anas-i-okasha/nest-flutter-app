import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config'; // will load and parse .env file use --npm i --save @nestjs/config-- to install it
import { UserModule } from './user/user.module';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisService } from './redis/redis.service';

@Module({
  // eslint-disable-next-line prettier/prettier
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    LoginModule,
    RegisterModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [],
      synchronize: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, RedisService],
  exports: [RedisService],
})
export class AppModule {}
