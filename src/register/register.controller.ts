import { Post, Body, Controller } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterDto } from 'src/user/register.dto';

@Controller('register')
export class RegisterController {
	constructor(private readonly registerService: RegisterService) {}

	@Post('saveNewUser')
	public registerUser(@Body() body: RegisterDto) {
		return this.registerService.registerNewUser(body);
	}
}
