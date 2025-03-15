import { Post, Body, Controller } from '@nestjs/common';
import { RegisterService } from './register.service';
import { LoginDto, RegisterDto } from 'src/register/register.dto';

@Controller('register')
export class RegisterController {
	constructor(private readonly registerService: RegisterService) {}

	@Post('saveNewUser')
	public registerUser(@Body() body: RegisterDto) {
		return this.registerService.registerNewUser(body);
	}

	@Post('login')
	public loginUser(@Body() body: LoginDto) {
		return this.registerService.login(body);
	}
}
