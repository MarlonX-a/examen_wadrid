import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecupHistorialPedido } from './entities';
import { HistorialService } from './services';
import { AuditoriaController } from './controllers';

@Module({
  imports: [
    // Configuración de SQLite propia para el microservicio de auditoría
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'auditoria.sqlite',
      entities: [RecupHistorialPedido],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([RecupHistorialPedido]),
  ],
  controllers: [AuditoriaController],
  providers: [HistorialService],
})
export class AppModule {}
