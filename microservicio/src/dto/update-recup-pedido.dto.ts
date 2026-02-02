import { PartialType } from '@nestjs/mapped-types';
import { CreateRecupPedidoDto } from './create-recup-pedido.dto';

export class UpdateRecupPedidoDto extends PartialType(CreateRecupPedidoDto) {}
