import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecupMesa } from '../entities/recup-mesa.entity';

@Injectable()
export class RecupMesaService {
  constructor(
    @InjectRepository(RecupMesa)
    private readonly mesaRepository: Repository<RecupMesa>,
  ) {}

  async findAll(): Promise<RecupMesa[]> {
    return await this.mesaRepository.find();
  }

  async create(data: Partial<RecupMesa>): Promise<RecupMesa> {
    const mesa = this.mesaRepository.create(data);
    return await this.mesaRepository.save(mesa);
  }
}
