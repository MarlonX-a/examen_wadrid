import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecupPedido } from '../entities/recup-pedido.entity';
import { CreateRecupPedidoDto, UpdateRecupPedidoDto } from '../dto';

@Injectable()
export class RecupPedidoService {
  constructor(
    @InjectRepository(RecupPedido)
    private readonly pedidoRepository: Repository<RecupPedido>,
  ) {}

  async create(createDto: CreateRecupPedidoDto): Promise<RecupPedido> {
    const pedido = this.pedidoRepository.create(createDto);
    return await this.pedidoRepository.save(pedido);
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
    Object.assign(pedido, updateDto);
    return await this.pedidoRepository.save(pedido);
  }

  async remove(id: number): Promise<void> {
    const pedido = await this.findOne(id);
    await this.pedidoRepository.remove(pedido);
  }
}
