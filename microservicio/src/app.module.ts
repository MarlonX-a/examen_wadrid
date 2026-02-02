import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RecupCliente, RecupMesa, RecupPedido } from './entities';
import { RecupPedidoService, RecupClienteService, RecupMesaService } from './services';
import { RecupPedidoController } from './controllers';
import { SeederService } from './seed';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [RecupCliente, RecupMesa, RecupPedido],
      synchronize: true,
    }),

    TypeOrmModule.forFeature([RecupCliente, RecupMesa, RecupPedido]),

    // Cliente RabbitMQ para emitir eventos al microservicio de auditoría
    ClientsModule.register([
      {
        name: 'AUDITORIA_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672'],
          queue: 'auditoria_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [AppController, RecupPedidoController],
  providers: [
    AppService,
    RecupPedidoService,
    RecupClienteService,
    RecupMesaService,
    SeederService,
  ],
})
export class AppModule {}
