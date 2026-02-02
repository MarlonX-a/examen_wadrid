import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

/**
 * Entidad para registrar el historial de cambios de estado de pedidos
 * Esta entidad solo existe en el microservicio de auditoría
 */
@Entity('recup_historial_pedido')
export class RecupHistorialPedido {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'recup_pedidoId' })
  pedidoId: number;

  @Column({ name: 'recup_estadoAnterior' })
  estadoAnterior: string;

  @Column({ name: 'recup_estadoNuevo' })
  estadoNuevo: string;

  @Column({ name: 'recup_observacion', nullable: true })
  observacion: string;

  @Column({ name: 'fechaCambio', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fechaCambio: Date;
}
