import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import type { PedidoEstadoCambiadoPayload } from '../services/historial.service';
import { HistorialService } from '../services/historial.service';

/**
 * Controlador de eventos RabbitMQ para auditoría
 * NO tiene endpoints HTTP - solo escucha eventos
 */
@Controller()
export class AuditoriaController {
  constructor(private readonly historialService: HistorialService) {}

  /**
   * Escucha el evento de cambio de estado de pedido
   * Nombre exacto del evento: recup_pedido.estado.cambiado
   */
  @EventPattern('recup_pedido.estado.cambiado')
  async handlePedidoEstadoCambiado(@Payload() payload: PedidoEstadoCambiadoPayload) {
    console.log('[Auditoría] Evento recibido:', JSON.stringify(payload));
    
    try {
      const registro = await this.historialService.registrarCambioEstado(payload);
      console.log(`[Auditoría] Registro guardado con ID: ${registro.id}`);
    } catch (error) {
      console.error('[Auditoría] Error al guardar registro:', error.message);
    }
  }
}
