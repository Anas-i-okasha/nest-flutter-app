import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { RegisterDto } from 'src/user/register.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
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

			return newUser;
		} catch (err) {
			console.log('registerNewUser', err);
		}
	}
}
