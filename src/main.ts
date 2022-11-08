import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function start() {
  const PORT = process.env.PORT || 5100;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Kraud Donate authorization')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(PORT, () =>
    console.log(`Server has started on Port:${PORT}`),
  );
}
start();
