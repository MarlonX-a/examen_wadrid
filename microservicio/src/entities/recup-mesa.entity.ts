import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RecupPedido } from './recup-pedido.entity';

@Entity('recup_mesa')
export class RecupMesa {
  @PrimaryGeneratedColumn({ name: 'recup_idmesa' })
  id: number;

  @Column({ name: 'recup_numero' })
  numero: string;

  @Column({ name: 'recup_capacidad' })
  capacidad: number;

  @Column({ name: 'recup_ubicacion', nullable: true })
  ubicacion: string;

  @Column({ name: 'recup_mesaestado', nullable: true })
  mesaestado: string;

  @Column({ name: 'recup_disponible', default: true })
  disponible: boolean;

  @OneToMany(() => RecupPedido, (pedido) => pedido.mesa)
  pedidos: RecupPedido[];
}
