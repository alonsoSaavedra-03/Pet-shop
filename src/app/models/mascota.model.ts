export type EspecieMascota = 'Perro' | 'Gato' | 'Ave' | 'Conejo' | 'Otro';
export type SexoMascota = 'Macho' | 'Hembra';
export type EstadoMascota = 'Disponible' | 'En adopción' | 'Adoptado';

export interface Mascota {
  id: string;
  nombre: string;
  especie: EspecieMascota;
  raza: string;
  edad: number;
  sexo: SexoMascota;
  estado: EstadoMascota;
  descripcion?: string;
  imagenUrl?: string;
  fechaRegistro: string;
}
