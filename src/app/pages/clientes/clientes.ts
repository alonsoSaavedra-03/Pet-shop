import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { PetShopService } from '../../services/pet-shop.service';
import { Cliente } from '../../models/cliente.model';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clientes.html',
  styleUrls: ['./clientes.scss']
})
export class ClientesComponent {
  private petService = inject(PetShopService);
  public clientes = this.petService.clientes;

  public nuevoCliente: {
    nombres: string;
    apellidos: string;
    dni: string;
    telefono: string;
    email: string;
    direccion: string;
  } = {
    nombres: '',
    apellidos: '',
    dni: '',
    telefono: '',
    email: '',
    direccion: ''
  };

  public mensajeExito: string | null = null;
  public busqueda: string = '';

  get clientesFiltrados(): Cliente[] {
    return this.clientes().filter(c => {
      const query = this.busqueda.toLowerCase();
      return c.nombres.toLowerCase().includes(query) ||
             c.apellidos.toLowerCase().includes(query) ||
             c.dni.includes(query) ||
             c.email.toLowerCase().includes(query);
    });
  }

  public onSubmit(form: NgForm): void {
    if (form.invalid) {
      Object.values(form.controls).forEach(control => control.markAsTouched());
      return;
    }

    const clienteCreado = this.petService.agregarCliente({
      nombres: this.nuevoCliente.nombres.trim(),
      apellidos: this.nuevoCliente.apellidos.trim(),
      dni: this.nuevoCliente.dni.trim(),
      telefono: this.nuevoCliente.telefono.trim(),
      email: this.nuevoCliente.email.trim().toLowerCase(),
      direccion: this.nuevoCliente.direccion.trim()
    });

    this.mensajeExito = `¡Cliente "${clienteCreado.nombres} ${clienteCreado.apellidos}" (${clienteCreado.id}) registrado con éxito!`;

    form.resetForm();
    this.nuevoCliente = {
      nombres: '',
      apellidos: '',
      dni: '',
      telefono: '',
      email: '',
      direccion: ''
    };

    setTimeout(() => {
      this.mensajeExito = null;
    }, 5000);
  }

  public eliminar(id: string, nombreCompleto: string): void {
    if (confirm(`¿Estás seguro de eliminar el registro del cliente ${nombreCompleto}?`)) {
      this.petService.eliminarCliente(id);
    }
  }
}
