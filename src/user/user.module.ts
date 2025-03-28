import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
	controllers: [UserController],
	providers: [UserService, JwtService],
	imports: [TypeOrmModule.forFeature([User])],
})
export class UserModule {}
