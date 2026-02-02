import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { RecupCliente } from './recup-cliente.entity';
import { RecupMesa } from './recup-mesa.entity';

@Entity('recup_pedido')
export class RecupPedido {
  @PrimaryGeneratedColumn({ name: 'recup_idpedido' })
  id: number;

  @Column({ name: 'recup_numero', nullable: true })
  numero: string;

  @Column({ name: 'recup_descripcion' })
  descripcion: string;

  @Column('real', { name: 'recup_total' })
  total: number;

  @Column({ name: 'recup_estado', default: 'RECIBIDO' })
  estado: string;

  @Column({ name: 'recup_fecha', type: 'datetime', default: () => "CURRENT_TIMESTAMP" })
  fecha: Date;

  @ManyToOne(() => RecupCliente, (cliente) => cliente.pedidos, { eager: true })
  @JoinColumn({ name: 'recup_clienteId' })
  cliente: RecupCliente;

  @Column({ name: 'recup_clienteId' })
  clienteId: number;

  @ManyToOne(() => RecupMesa, (mesa) => mesa.pedidos, { eager: true })
  @JoinColumn({ name: 'recup_mesaId' })
  mesa: RecupMesa;

  @Column({ name: 'recup_mesaId' })
  mesaId: number;
}
