import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecupHistorialPedido } from '../entities';

/**
 * Interface para el payload del evento de cambio de estado
 */
export interface PedidoEstadoCambiadoPayload {
  pedidoId: number;
  estadoAnterior: string;
  estadoNuevo: string;
  fechaCambio: Date;
  observacion?: string;
}

@Injectable()
export class HistorialService {
  constructor(
    @InjectRepository(RecupHistorialPedido)
    private readonly historialRepository: Repository<RecupHistorialPedido>,
  ) {}

  /**
   * Registra un cambio de estado en el historial
   */
  async registrarCambioEstado(payload: PedidoEstadoCambiadoPayload): Promise<RecupHistorialPedido> {
    const registro = this.historialRepository.create({
      pedidoId: payload.pedidoId,
      estadoAnterior: payload.estadoAnterior,
      estadoNuevo: payload.estadoNuevo,
      observacion: payload.observacion || `Cambio de ${payload.estadoAnterior} a ${payload.estadoNuevo}`,
      fechaCambio: payload.fechaCambio || new Date(),
    });

    const saved = await this.historialRepository.save(registro);
    console.log(`[Auditoría] Registrado cambio de estado para pedido ${payload.pedidoId}: ${payload.estadoAnterior} -> ${payload.estadoNuevo}`);
    return saved;
  }

  /**
   * Obtiene todo el historial (para debugging)
   */
  async findAll(): Promise<RecupHistorialPedido[]> {
    return this.historialRepository.find({
      order: { fechaCambio: 'DESC' },
    });
  }

  /**
   * Obtiene el historial de un pedido específico
   */
  async findByPedidoId(pedidoId: number): Promise<RecupHistorialPedido[]> {
    return this.historialRepository.find({
      where: { pedidoId },
      order: { fechaCambio: 'DESC' },
    });
  }
}
