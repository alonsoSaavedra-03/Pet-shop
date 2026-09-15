import { Injectable, signal, computed } from '@angular/core';
import { Mascota } from '../models/mascota.model';
import { Cliente } from '../models/cliente.model';
import { SolicitudAdopcion, EstadoAdopcion } from '../models/adopcion.model';

const STORAGE_KEY_MASCOTAS = 'petshop_mascotas';
const STORAGE_KEY_CLIENTES = 'petshop_clientes';
const STORAGE_KEY_ADOPCIONES = 'petshop_adopciones';

const MOCK_MASCOTAS: Mascota[] = [
  {
    id: 'M-001',
    nombre: 'Max',
    especie: 'Perro',
    raza: 'Golden Retriever',
    edad: 2,
    sexo: 'Macho',
    estado: 'Disponible',
    descripcion: 'Cariñoso, juguetón y convive excelente con niños.',
    imagenUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=500&auto=format&fit=crop&q=80',
    fechaRegistro: '2026-09-01'
  },
  {
    id: 'M-002',
    nombre: 'Luna',
    especie: 'Gato',
    raza: 'Siamés',
    edad: 1,
    sexo: 'Hembra',
    estado: 'En adopción',
    descripcion: 'Tranquila, esterilizada y acostumbrada a departamento.',
    imagenUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500&auto=format&fit=crop&q=80',
    fechaRegistro: '2026-09-03'
  },
  {
    id: 'M-003',
    nombre: 'Rocky',
    especie: 'Perro',
    raza: 'Bulldog Francés',
    edad: 3,
    sexo: 'Macho',
    estado: 'Disponible',
    descripcion: 'Muy dócil, con vacunas al día y control veterinario.',
    imagenUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500&auto=format&fit=crop&q=80',
    fechaRegistro: '2026-09-05'
  },
  {
    id: 'M-004',
    nombre: 'Kiwi',
    especie: 'Ave',
    raza: 'Periquito Australiano',
    edad: 1,
    sexo: 'Hembra',
    estado: 'Disponible',
    descripcion: 'Canto alegre, plumaje saludable y muy activa.',
    imagenUrl: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=500&auto=format&fit=crop&q=80',
    fechaRegistro: '2026-09-08'
  },
  {
    id: 'M-005',
    nombre: 'Tambor',
    especie: 'Conejo',
    raza: 'Cabeza de León',
    edad: 1,
    sexo: 'Macho',
    estado: 'Adoptado',
    descripcion: 'Pelaje suave, come heno y verduras frescas.',
    imagenUrl: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=500&auto=format&fit=crop&q=80',
    fechaRegistro: '2026-09-10'
  }
];

const MOCK_CLIENTES: Cliente[] = [
  {
    id: 'C-001',
    nombres: 'Carlos Alberto',
    apellidos: 'Mendoza Ruiz',
    dni: '74829103',
    telefono: '987654321',
    email: 'carlos.mendoza@gmail.com',
    direccion: 'Av. Las Palmeras 450, San Isidro',
    fechaRegistro: '2026-09-02'
  },
  {
    id: 'C-002',
    nombres: 'Mariana Sofia',
    apellidos: 'Gómez Paredes',
    dni: '45910283',
    telefono: '951234876',
    email: 'mariana.gomez@hotmail.com',
    direccion: 'Calle Los Pinos 120, Miraflores',
    fechaRegistro: '2026-09-04'
  },
  {
    id: 'C-003',
    nombres: 'Jorge Luis',
    apellidos: 'Vargas Silva',
    dni: '71029384',
    telefono: '963852741',
    email: 'jorge.vargas@outlook.com',
    direccion: 'Jr. Huancavelica 782, Surco',
    fechaRegistro: '2026-09-09'
  }
];

const MOCK_ADOPCIONES: SolicitudAdopcion[] = [
  {
    id: 'SOL-001',
    clienteId: 'C-001',
    clienteNombre: 'Carlos Alberto Mendoza Ruiz',
    mascotaId: 'M-002',
    mascotaNombre: 'Luna (Gato - Siamés)',
    fechaSolicitud: '2026-09-10',
    motivoAdopcion: 'Deseamos darle un hogar lleno de amor a un felino y convivir en familia.',
    tipoVivienda: 'Departamento',
    email: 'carlos.mendoza@gmail.com',
    observaciones: 'El departamento cuenta con mallas de seguridad en balcones y ventanas.',
    estado: 'Pendiente'
  },
  {
    id: 'SOL-002',
    clienteId: 'C-002',
    clienteNombre: 'Mariana Sofia Gómez Paredes',
    mascotaId: 'M-005',
    mascotaNombre: 'Tambor (Conejo - Cabeza de León)',
    fechaSolicitud: '2026-09-11',
    motivoAdopcion: 'Tenemos un jardín amplio y experiencia previa con conejos y animales de granja.',
    tipoVivienda: 'Casa con jardín',
    email: 'mariana.gomez@hotmail.com',
    observaciones: 'Cuenta con jaula amplia y espacio abierto protegido.',
    estado: 'Aprobada'
  }
];

@Injectable({
  providedIn: 'root'
})
export class PetShopService {
  private mascotasSignal = signal<Mascota[]>(this.loadFromStorage(STORAGE_KEY_MASCOTAS, MOCK_MASCOTAS));
  private clientesSignal = signal<Cliente[]>(this.loadFromStorage(STORAGE_KEY_CLIENTES, MOCK_CLIENTES));
  private adopcionesSignal = signal<SolicitudAdopcion[]>(this.loadFromStorage(STORAGE_KEY_ADOPCIONES, MOCK_ADOPCIONES));

  // Read-only signals
  public readonly mascotas = this.mascotasSignal.asReadonly();
  public readonly clientes = this.clientesSignal.asReadonly();
  public readonly adopciones = this.adopcionesSignal.asReadonly();

  // Metrics for Dashboard (RF05)
  public readonly kpis = computed(() => {
    const pets = this.mascotasSignal();
    const clients = this.clientesSignal();
    const adoptions = this.adopcionesSignal();

    const disponibles = pets.filter(p => p.estado === 'Disponible').length;
    const enAdopcion = pets.filter(p => p.estado === 'En adopción').length;
    const adoptados = pets.filter(p => p.estado === 'Adoptado').length;

    const pendientes = adoptions.filter(a => a.estado === 'Pendiente').length;
    const aprobadas = adoptions.filter(a => a.estado === 'Aprobada').length;
    const rechazadas = adoptions.filter(a => a.estado === 'Rechazada').length;

    // Distribution by species
    const especies = {
      Perro: pets.filter(p => p.especie === 'Perro').length,
      Gato: pets.filter(p => p.especie === 'Gato').length,
      Ave: pets.filter(p => p.especie === 'Ave').length,
      Conejo: pets.filter(p => p.especie === 'Conejo').length,
      Otro: pets.filter(p => p.especie === 'Otro').length
    };

    return {
      totalMascotas: pets.length,
      totalClientes: clients.length,
      totalAdopciones: adoptions.length,
      mascotasDisponibles: disponibles,
      mascotasEnAdopcion: enAdopcion,
      mascotasAdoptadas: adoptados,
      adopcionesPendientes: pendientes,
      adopcionesAprobadas: aprobadas,
      adopcionesRechazadas: rechazadas,
      especies
    };
  });

  private loadFromStorage<T>(key: string, defaultData: T[]): T[] {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const item = localStorage.getItem(key);
        if (item) {
          return JSON.parse(item);
        }
      }
    } catch (e) {
      console.warn(`Error reading ${key} from storage:`, e);
    }
    return defaultData;
  }

  private saveToStorage<T>(key: string, data: T[]) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(key, JSON.stringify(data));
      }
    } catch (e) {
      console.warn(`Error saving ${key} to storage:`, e);
    }
  }

  // --- Mascotas CRUD (RF01, RF02) ---
  public agregarMascota(nueva: Omit<Mascota, 'id' | 'fechaRegistro'>): Mascota {
    const id = `M-${String(this.mascotasSignal().length + 1).padStart(3, '0')}`;
    const fecha = new Date().toISOString().split('T')[0];
    const defaultImages: Record<string, string> = {
      Perro: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&auto=format&fit=crop&q=80',
      Gato: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=500&auto=format&fit=crop&q=80',
      Ave: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=500&auto=format&fit=crop&q=80',
      Conejo: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=500&auto=format&fit=crop&q=80',
      Otro: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=500&auto=format&fit=crop&q=80'
    };
    const mascotaCompleta: Mascota = {
      ...nueva,
      imagenUrl: nueva.imagenUrl?.trim() || defaultImages[nueva.especie] || defaultImages['Otro'],
      id,
      fechaRegistro: fecha
    };

    const actualizados = [mascotaCompleta, ...this.mascotasSignal()];
    this.mascotasSignal.set(actualizados);
    this.saveToStorage(STORAGE_KEY_MASCOTAS, actualizados);
    return mascotaCompleta;
  }

  public eliminarMascota(id: string) {
    const filtrados = this.mascotasSignal().filter(m => m.id !== id);
    this.mascotasSignal.set(filtrados);
    this.saveToStorage(STORAGE_KEY_MASCOTAS, filtrados);
  }

  public cambiarEstadoMascota(id: string, nuevoEstado: Mascota['estado']) {
    const actualizados = this.mascotasSignal().map(m =>
      m.id === id ? { ...m, estado: nuevoEstado } : m
    );
    this.mascotasSignal.set(actualizados);
    this.saveToStorage(STORAGE_KEY_MASCOTAS, actualizados);
  }

  // --- Clientes CRUD (RF03) ---
  public agregarCliente(nuevo: Omit<Cliente, 'id' | 'fechaRegistro'>): Cliente {
    const id = `C-${String(this.clientesSignal().length + 1).padStart(3, '0')}`;
    const fecha = new Date().toISOString().split('T')[0];
    const clienteCompleto: Cliente = {
      ...nuevo,
      id,
      fechaRegistro: fecha
    };

    const actualizados = [clienteCompleto, ...this.clientesSignal()];
    this.clientesSignal.set(actualizados);
    this.saveToStorage(STORAGE_KEY_CLIENTES, actualizados);
    return clienteCompleto;
  }

  public eliminarCliente(id: string) {
    const filtrados = this.clientesSignal().filter(c => c.id !== id);
    this.clientesSignal.set(filtrados);
    this.saveToStorage(STORAGE_KEY_CLIENTES, filtrados);
  }

  // --- Adopciones CRUD (RF04) ---
  public agregarAdopcion(solicitud: Omit<SolicitudAdopcion, 'id' | 'estado'>): SolicitudAdopcion {
    const id = `SOL-${String(this.adopcionesSignal().length + 1).padStart(3, '0')}`;
    const nuevaSolicitud: SolicitudAdopcion = {
      ...solicitud,
      id,
      estado: 'Pendiente'
    };

    // Actualizar estado de mascota a 'En adopción' si estaba disponible
    if (solicitud.mascotaId) {
      this.cambiarEstadoMascota(solicitud.mascotaId, 'En adopción');
    }

    const actualizados = [nuevaSolicitud, ...this.adopcionesSignal()];
    this.adopcionesSignal.set(actualizados);
    this.saveToStorage(STORAGE_KEY_ADOPCIONES, actualizados);
    return nuevaSolicitud;
  }

  public cambiarEstadoAdopcion(id: string, nuevoEstado: EstadoAdopcion) {
    const solicitud = this.adopcionesSignal().find(a => a.id === id);
    if (solicitud && solicitud.mascotaId) {
      if (nuevoEstado === 'Aprobada') {
        this.cambiarEstadoMascota(solicitud.mascotaId, 'Adoptado');
      } else if (nuevoEstado === 'Rechazada') {
        this.cambiarEstadoMascota(solicitud.mascotaId, 'Disponible');
      }
    }

    const actualizados = this.adopcionesSignal().map(a =>
      a.id === id ? { ...a, estado: nuevoEstado } : a
    );
    this.adopcionesSignal.set(actualizados);
    this.saveToStorage(STORAGE_KEY_ADOPCIONES, actualizados);
  }

  public eliminarAdopcion(id: string) {
    const filtrados = this.adopcionesSignal().filter(a => a.id !== id);
    this.adopcionesSignal.set(filtrados);
    this.saveToStorage(STORAGE_KEY_ADOPCIONES, filtrados);
  }

  public reiniciarDatos() {
    this.mascotasSignal.set(MOCK_MASCOTAS);
    this.clientesSignal.set(MOCK_CLIENTES);
    this.adopcionesSignal.set(MOCK_ADOPCIONES);
    this.saveToStorage(STORAGE_KEY_MASCOTAS, MOCK_MASCOTAS);
    this.saveToStorage(STORAGE_KEY_CLIENTES, MOCK_CLIENTES);
    this.saveToStorage(STORAGE_KEY_ADOPCIONES, MOCK_ADOPCIONES);
  }
}
