import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecupCliente } from '../entities/recup-cliente.entity';
import { RecupMesa } from '../entities/recup-mesa.entity';
import { RecupPedido } from '../entities/recup-pedido.entity';

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(
    @InjectRepository(RecupCliente)
    private readonly clienteRepository: Repository<RecupCliente>,
    @InjectRepository(RecupMesa)
    private readonly mesaRepository: Repository<RecupMesa>,
    @InjectRepository(RecupPedido)
    private readonly pedidoRepository: Repository<RecupPedido>,
  ) {}

  async onModuleInit() {
    await this.seed();
  }

  async seed() {
    // Verificar si ya hay datos
    const clientesCount = await this.clienteRepository.count();
    if (clientesCount > 0) {
      console.log('Base de datos ya tiene datos, omitiendo seed...');
      return;
    }

    console.log('Poblando base de datos con datos de prueba...');

    // Crear 3 clientes (ajustado a nombres de columna recup_*)
    const clientes = await this.clienteRepository.save([
      {
        documento: '12345678',
        nombreCompleto: 'Juan Pérez',
        email: 'juan.perez@email.com',
        telefono: '555-0101',
        direccion: 'Calle Falsa 123',
      },
      {
        documento: '87654321',
        nombreCompleto: 'María García',
        email: 'maria.garcia@email.com',
        telefono: '555-0102',
        direccion: 'Avenida Siempre Viva 742',
      },
      {
        documento: '11223344',
        nombreCompleto: 'Carlos López',
        email: 'carlos.lopez@email.com',
        telefono: '555-0103',
        direccion: 'Boulevard Central 10',
      },
    ]);

    // Crear 3 mesas
    const mesas = await this.mesaRepository.save([
      { numero: '1', capacidad: 4, ubicacion: 'INTERIOR', mesaestado: 'LIBRE', disponible: true },
      { numero: '2', capacidad: 6, ubicacion: 'TERRAZA', mesaestado: 'OCUPADA', disponible: true },
      { numero: '3', capacidad: 2, ubicacion: 'VIP', mesaestado: 'LIBRE', disponible: false },
    ]);

    // Crear 3 pedidos
    await this.pedidoRepository.save([
      {
        descripcion: 'Pizza Margherita y 2 refrescos',
        total: 25.5,
        estado: 'RECIBIDO',
        clienteId: clientes[0].id,
        mesaId: mesas[0].id,
      },
      {
        descripcion: 'Pasta Carbonara y ensalada César',
        total: 32,
        estado: 'EN_PREPARACION',
        clienteId: clientes[1].id,
        mesaId: mesas[1].id,
      },
      {
        descripcion: 'Hamburguesa doble con papas fritas',
        total: 18.75,
        estado: 'ENTREGADO',
        clienteId: clientes[2].id,
        mesaId: mesas[2].id,
      },
    ]);

    console.log('Seed completado: 3 clientes, 3 mesas, 3 pedidos creados.');
  }
}
