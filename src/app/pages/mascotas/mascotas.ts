import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { PetShopService } from '../../services/pet-shop.service';
import { Mascota, EspecieMascota, SexoMascota, EstadoMascota } from '../../models/mascota.model';

@Component({
  selector: 'app-mascotas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mascotas.html',
  styleUrls: ['./mascotas.scss']
})
export class MascotasComponent {
  private petService = inject(PetShopService);
  public mascotas = this.petService.mascotas;

  // Modelo enlazado mediante ngModel (Template-Driven Form)
  public nuevaMascota: {
    nombre: string;
    especie: EspecieMascota | '';
    raza: string;
    edad: number | null;
    sexo: SexoMascota | '';
    estado: EstadoMascota;
    descripcion: string;
    imagenUrl: string;
  } = {
    nombre: '',
    especie: '',
    raza: '',
    edad: null,
    sexo: '',
    estado: 'Disponible',
    descripcion: '',
    imagenUrl: ''
  };

  public especies: EspecieMascota[] = ['Perro', 'Gato', 'Ave', 'Conejo', 'Otro'];
  public mensajeExito: string | null = null;
  public busqueda: string = '';
  public filtroEspecie: string = 'TODAS';

  get mascotasFiltradas(): Mascota[] {
    return this.mascotas().filter(m => {
      const coincideTexto = m.nombre.toLowerCase().includes(this.busqueda.toLowerCase()) ||
                            m.raza.toLowerCase().includes(this.busqueda.toLowerCase()) ||
                            m.id.toLowerCase().includes(this.busqueda.toLowerCase());
      const coincideEspecie = this.filtroEspecie === 'TODAS' || m.especie === this.filtroEspecie;
      return coincideTexto && coincideEspecie;
    });
  }

  public onSubmit(form: NgForm): void {
    if (form.invalid) {
      // Marcar controles como touched para mostrar errores visuales
      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    // Registrar en el servicio centralizado
    const mascotaRegistrada = this.petService.agregarMascota({
      nombre: this.nuevaMascota.nombre.trim(),
      especie: this.nuevaMascota.especie as EspecieMascota,
      raza: this.nuevaMascota.raza.trim(),
      edad: Number(this.nuevaMascota.edad),
      sexo: this.nuevaMascota.sexo as SexoMascota,
      estado: this.nuevaMascota.estado,
      descripcion: this.nuevaMascota.descripcion.trim(),
      imagenUrl: this.nuevaMascota.imagenUrl.trim()
    });

    this.mensajeExito = `Mascota "${mascotaRegistrada.nombre}" (${mascotaRegistrada.id}) registrada exitosamente.`;

    // Resetear formulario
    form.resetForm({
      estado: 'Disponible'
    });
    this.nuevaMascota = {
      nombre: '',
      especie: '',
      raza: '',
      edad: null,
      sexo: '',
      estado: 'Disponible',
      descripcion: '',
      imagenUrl: ''
    };

    setTimeout(() => {
      this.mensajeExito = null;
    }, 5000);
  }

  public eliminar(id: string, nombre: string): void {
    if (confirm(`¿Estás seguro de eliminar a la mascota ${nombre} (${id})?`)) {
      this.petService.eliminarMascota(id);
    }
  }

  public cambiarEstado(id: string, nuevoEstado: EstadoMascota): void {
    this.petService.cambiarEstadoMascota(id, nuevoEstado);
  }
}
