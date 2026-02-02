import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { RecupPedido } from '../entities/recup-pedido.entity';
import { CreateRecupPedidoDto, UpdateRecupPedidoDto } from '../dto';

@Injectable()
export class RecupPedidoService {
  constructor(
    @InjectRepository(RecupPedido)
    private readonly pedidoRepository: Repository<RecupPedido>,
    @Inject('AUDITORIA_SERVICE')
    private readonly auditoriaClient: ClientProxy,
  ) {}

  async create(createDto: CreateRecupPedidoDto): Promise<RecupPedido> {
    const pedido = this.pedidoRepository.create(createDto);
    const saved = await this.pedidoRepository.save(pedido);

    // Emitir evento de creación (estado inicial)
    this.emitirCambioEstado(saved.id, null, saved.estado);

    return saved;
  }

  async findAll(): Promise<RecupPedido[]> {
    return await this.pedidoRepository.find({
      relations: ['cliente', 'mesa'],
    });
  }

  async findOne(id: number): Promise<RecupPedido> {
    const pedido = await this.pedidoRepository.findOne({
      where: { id },
      relations: ['cliente', 'mesa'],
    });
    if (!pedido) {
      throw new NotFoundException(`Pedido con ID ${id} no encontrado`);
    }
    return pedido;
  }

  async update(id: number, updateDto: UpdateRecupPedidoDto): Promise<RecupPedido> {
    const pedido = await this.findOne(id);
    const estadoAnterior = pedido.estado;

    Object.assign(pedido, updateDto);
    const updated = await this.pedidoRepository.save(pedido);

    // Emitir evento si el estado cambió
    if (updateDto.estado && updateDto.estado !== estadoAnterior) {
      this.emitirCambioEstado(id, estadoAnterior, updateDto.estado);
    }

    return updated;
  }

  async remove(id: number): Promise<void> {
    const pedido = await this.findOne(id);
    await this.pedidoRepository.remove(pedido);
  }

  /**
   * Emite el evento de cambio de estado al microservicio de auditoría
   * Nombre exacto del evento: recup_pedido.estado.cambiado
   */
  private emitirCambioEstado(pedidoId: number, estadoAnterior: string | null, estadoNuevo: string): void {
    const payload = {
      pedidoId,
      estadoAnterior: estadoAnterior || 'NUEVO',
      estadoNuevo,
      fechaCambio: new Date(),
    };

    console.log(`[Backend] Emitiendo evento recup_pedido.estado.cambiado:`, payload);
    this.auditoriaClient.emit('recup_pedido.estado.cambiado', payload);
  }
}
