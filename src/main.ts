import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

let cors = require('cors')

async function start() {
  const PORT = process.env.PORT || 5100;

  const app = await NestFactory.create(AppModule);
  app.use(cors())

  await app.listen(PORT, () =>
    console.log(`Server has started on Port:${PORT}`)
  );
}
start();
