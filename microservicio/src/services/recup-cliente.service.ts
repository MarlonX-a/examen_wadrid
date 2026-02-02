import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecupCliente } from '../entities/recup-cliente.entity';

@Injectable()
export class RecupClienteService {
  constructor(
    @InjectRepository(RecupCliente)
    private readonly clienteRepository: Repository<RecupCliente>,
  ) {}

  async findAll(): Promise<RecupCliente[]> {
    return await this.clienteRepository.find();
  }

  async create(data: Partial<RecupCliente>): Promise<RecupCliente> {
    const cliente = this.clienteRepository.create(data);
    return await this.clienteRepository.save(cliente);
  }
}
