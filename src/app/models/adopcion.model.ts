export type TipoVivienda = 'Casa con jardín' | 'Casa sin jardín' | 'Departamento' | 'Finca';
export type EstadoAdopcion = 'Pendiente' | 'Aprobada' | 'Rechazada';

export interface SolicitudAdopcion {
  id: string;
  clienteId: string;
  clienteNombre: string;
  mascotaId: string;
  mascotaNombre: string;
  fechaSolicitud: string;
  motivoAdopcion: string;
  tipoVivienda: TipoVivienda;
  email: string;
  observaciones?: string;
  estado: EstadoAdopcion;
}
