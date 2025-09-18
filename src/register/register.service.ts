import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { LoginDto, RegisterDto } from 'src/register/register.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AccessToken, JwtPayload } from 'src/utility/types';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class RegisterService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		private readonly jwtService: JwtService,
		private readonly redisService: RedisService,
	) {}

	/**
	 * create a new user account
	 * @param user userData object to create a new user account
	 * @returns jwt token
	 */
	public async registerNewUser(user: RegisterDto) {
		try {
			const { first_name, last_name, email, password } = user;
			const isUserExist = await this.userRepository.findBy({
				email: email,
			});

			if (isUserExist.length)
				return new BadRequestException('User already exists');

			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(password, salt);

			let newUser = await this.userRepository.create({
				first_name,
				last_name,
				email,
				password: hashedPassword,
			});

			newUser = await this.userRepository.save(newUser);
			delete newUser.password;

			const payload: JwtPayload = { id: newUser.id };
			const accessToken: AccessToken = await this.generateJWT(payload);

			return { token: accessToken };
		} catch (err) {
			console.log('registerNewUser', err);
		}
	}

	/**
	 * function to login user with password and email
	 * @param user user info to login
	 * @returns user info
	 */
	public async login(user: LoginDto) {
		try {
			const { email, password } = user;
			const userInfo = await this.userRepository.findOne({
				where: { email: email },
			});

			if (!userInfo)
				return new BadRequestException('Invalid user name or password');

			const isPasswordValid = await bcrypt.compare(
				password,
				userInfo.password,
			);

			if (!isPasswordValid)
				return new BadRequestException('Invalid user name or password');

			const accessToken: AccessToken = await this.generateJWT({
				id: userInfo.id,
			});

			await this.redisService.set('login', accessToken);

			return { token: accessToken };
		} catch (err) {
			console.log('login', err);
		}
	}

	private async generateJWT(payload: JwtPayload): Promise<AccessToken> {
		try {
			return await this.jwtService.sign(payload, {
				secret: process.env.JWT_SECRET_KEY,
				expiresIn: process.env.JWT_EXPIRY_IN,
			});
		} catch (ex) {
			console.log(ex, 'generateJWT');
		}
	}
}
