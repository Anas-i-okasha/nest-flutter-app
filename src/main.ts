import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
<<<<<<< HEAD
  await app.listen(3000);
=======
  await app.listen(process.env.PORT);
>>>>>>> master
}
bootstrap();
