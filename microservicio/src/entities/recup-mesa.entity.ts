import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RecupPedido } from './recup-pedido.entity';

@Entity('recup_mesa')
export class RecupMesa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numero: number;

  @Column()
  capacidad: number;

  @Column({ default: true })
  disponible: boolean;

  @OneToMany(() => RecupPedido, (pedido) => pedido.mesa)
  pedidos: RecupPedido[];
}
