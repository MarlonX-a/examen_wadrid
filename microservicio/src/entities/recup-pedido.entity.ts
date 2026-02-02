import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { RecupCliente } from './recup-cliente.entity';
import { RecupMesa } from './recup-mesa.entity';

@Entity('recup_pedido')
export class RecupPedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descripcion: string;

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @Column({ default: 'pendiente' })
  estado: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fechaCreacion: Date;

  @ManyToOne(() => RecupCliente, (cliente) => cliente.pedidos, { eager: true })
  @JoinColumn({ name: 'clienteId' })
  cliente: RecupCliente;

  @Column()
  clienteId: number;

  @ManyToOne(() => RecupMesa, (mesa) => mesa.pedidos, { eager: true })
  @JoinColumn({ name: 'mesaId' })
  mesa: RecupMesa;

  @Column()
  mesaId: number;
}
