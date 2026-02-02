import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RecupPedido } from './recup-pedido.entity';

@Entity('recup_cliente')
export class RecupCliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  email: string;

  @Column()
  telefono: string;

  @OneToMany(() => RecupPedido, (pedido) => pedido.cliente)
  pedidos: RecupPedido[];
}
