import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RecupPedido } from './recup-pedido.entity';

@Entity('recup_cliente')
export class RecupCliente {
  @PrimaryGeneratedColumn({ name: 'recup_idcliente' })
  id: number;

  @Column({ name: 'recup_documento', unique: true })
  documento: string;

  @Column({ name: 'recup_nombreCompleto' })
  nombreCompleto: string;

  @Column({ name: 'recup_telefono' })
  telefono: string;

  @Column({ name: 'recup_direccion' })
  direccion: string;

  @Column({ name: 'recup_email' })
  email: string;

  @OneToMany(() => RecupPedido, (pedido) => pedido.cliente)
  pedidos: RecupPedido[];
}
