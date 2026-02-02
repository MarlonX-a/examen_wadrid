import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { RecupPedidoService } from '../services/recup-pedido.service';
import { CreateRecupPedidoDto, UpdateRecupPedidoDto } from '../dto';

@Controller('recup-pedidos')
export class RecupPedidoController {
  constructor(private readonly pedidoService: RecupPedidoService) {}

  @Post()
  create(@Body() createDto: CreateRecupPedidoDto) {
    return this.pedidoService.create(createDto);
  }

  @Get()
  findAll() {
    return this.pedidoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.pedidoService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateRecupPedidoDto,
  ) {
    return this.pedidoService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.pedidoService.remove(id);
  }
}
