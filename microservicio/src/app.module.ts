import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
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
