import { webcrypto } from 'crypto';
(global as any).crypto = webcrypto;

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);

  const rmqUrl = config.get<string>('RABBITMQ_URL');
  if (rmqUrl) {
    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.RMQ,
      options: {
        urls: [rmqUrl],
        queue: config.get<string>('RABBITMQ_QUEUE'),
        queueOptions: { durable: true },
      },
    });

    await app.startAllMicroservices();
  }

  const port = config.get<number>('PORT', 3003);
  await app.listen(port, '0.0.0.0');

  console.log('ComentarioMS corriendo en puerto', port);
}
bootstrap();