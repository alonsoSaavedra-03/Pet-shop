import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PetShopService } from '../../services/pet-shop.service';
import { SolicitudAdopcion, TipoVivienda, EstadoAdopcion } from '../../models/adopcion.model';

@Component({
  selector: 'app-adopciones',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './adopciones.html',
  styleUrls: ['./adopciones.scss']
})
export class AdopcionesComponent implements OnInit {
  private fb = inject(FormBuilder);
  private petService = inject(PetShopService);

  public clientes = this.petService.clientes;
  public mascotas = this.petService.mascotas;
  public adopciones = this.petService.adopciones;

  // Reactive Form Group
  public adopcionForm!: FormGroup;

  public tiposVivienda: TipoVivienda[] = [
    'Casa con jardín',
    'Casa sin jardín',
    'Departamento',
    'Finca'
  ];

  public mensajeExito: string | null = null;
  public filtroEstado: string = 'TODAS';

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  private inicializarFormulario(): void {
    // Formulario reactivo empleando FormBuilder, FormGroup y Validators
    const hoy = new Date().toISOString().split('T')[0];

    this.adopcionForm = this.fb.group({
      clienteId: ['', [Validators.required]],
      mascotaId: ['', [Validators.required]],
      fechaSolicitud: [hoy, [Validators.required]],
      motivoAdopcion: ['', [Validators.required, Validators.minLength(10)]],
      tipoVivienda: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      observaciones: ['']
    });

    // Sincronizar email del cliente seleccionado automáticamente si está registrado
    this.adopcionForm.get('clienteId')?.valueChanges.subscribe(clienteId => {
      if (clienteId) {
        const clienteSel = this.clientes().find(c => c.id === clienteId);
        if (clienteSel) {
          this.adopcionForm.patchValue({ email: clienteSel.email });
        }
      }
    });
  }

  // Helper para verificar errores en controles reactivos
  public isInvalid(controlName: string): boolean {
    const control = this.adopcionForm.get(controlName);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }

  public getError(controlName: string, errorName: string): boolean {
    const control = this.adopcionForm.get(controlName);
    return !!(control && control.hasError(errorName) && (control.touched || control.dirty));
  }

  get adopcionesFiltradas(): SolicitudAdopcion[] {
    if (this.filtroEstado === 'TODAS') {
      return this.adopciones();
    }
    return this.adopciones().filter(a => a.estado === this.filtroEstado);
  }

  public onSubmit(): void {
    if (this.adopcionForm.invalid) {
      this.adopcionForm.markAllAsTouched();
      return;
    }

    const formValues = this.adopcionForm.value;
    const cliente = this.clientes().find(c => c.id === formValues.clienteId);
    const mascota = this.mascotas().find(m => m.id === formValues.mascotaId);

    const nuevaSolicitud = this.petService.agregarAdopcion({
      clienteId: formValues.clienteId,
      clienteNombre: cliente ? `${cliente.nombres} ${cliente.apellidos}` : 'Cliente Registrado',
      mascotaId: formValues.mascotaId,
      mascotaNombre: mascota ? `${mascota.nombre} (${mascota.especie} - ${mascota.raza})` : 'Mascota',
      fechaSolicitud: formValues.fechaSolicitud,
      motivoAdopcion: formValues.motivoAdopcion.trim(),
      tipoVivienda: formValues.tipoVivienda,
      email: formValues.email.trim(),
      observaciones: formValues.observaciones ? formValues.observaciones.trim() : ''
    });

    this.mensajeExito = `¡Solicitud de Adopción (${nuevaSolicitud.id}) registrada exitosamente para ${nuevaSolicitud.mascotaNombre}!`;

    // Resetear formulario con fecha actual
    const hoy = new Date().toISOString().split('T')[0];
    this.adopcionForm.reset({
      clienteId: '',
      mascotaId: '',
      fechaSolicitud: hoy,
      motivoAdopcion: '',
      tipoVivienda: '',
      email: '',
      observaciones: ''
    });

    setTimeout(() => {
      this.mensajeExito = null;
    }, 5000);
  }

  public cambiarEstado(id: string, nuevoEstado: EstadoAdopcion): void {
    this.petService.cambiarEstadoAdopcion(id, nuevoEstado);
  }

  public eliminar(id: string): void {
    if (confirm(`¿Deseas eliminar la solicitud ${id}?`)) {
      this.petService.eliminarAdopcion(id);
    }
  }
}
