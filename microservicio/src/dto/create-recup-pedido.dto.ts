import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateRecupPedidoDto {
  @IsString()
  descripcion: string;

  @IsNumber()
  total: number;

  @IsString()
  @IsOptional()
  estado?: string;

  @IsNumber()
  clienteId: number;

  @IsNumber()
  mesaId: number;
}
