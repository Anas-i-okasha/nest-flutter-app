import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { RedisService } from 'src/redis/redis.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([User]),
		JwtModule.register({
			secret: process.env.JWT_SECRET_KEY,
			signOptions: { expiresIn: process.env.JWT_EXPIRY_IN },
		}),
	],
	controllers: [RegisterController],
	providers: [RegisterService, JwtService, RedisService],
})
export class RegisterModule {}
