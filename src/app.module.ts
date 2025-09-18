import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config'; // will load and parse .env file use --npm i --save @nestjs/config-- to install it
import { UserModule } from './user/user.module';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisService } from './redis/redis.service';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { User } from './entity/user.entity';
import { ChatGateway } from './chat/chat.gateway';

@Module({
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
			entities: [User],
			synchronize: true,
		}),
	],
	controllers: [AppController],
	providers: [AppService, RedisService, ChatGateway],
	exports: [RedisService],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes('*'); // Apply globally for all routes
	}
}
