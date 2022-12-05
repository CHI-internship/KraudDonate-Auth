import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { serverAdapter } from './queues';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cors = require('cors');

async function start() {
  const PORT = process.env.PORT || 5100;
  const app = await NestFactory.create(AppModule);

  app.use(cors());
  app.use('/admin/queues', serverAdapter.getRouter());

  await app.listen(PORT, () =>
    console.log(`Server has started on Port:${PORT}`),
  );
}
start();
