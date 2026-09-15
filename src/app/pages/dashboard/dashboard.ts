import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PetShopService } from '../../services/pet-shop.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent {
  private petService = inject(PetShopService);

  public kpis = this.petService.kpis;
  public mascotas = this.petService.mascotas;
  public clientes = this.petService.clientes;
  public adopciones = this.petService.adopciones;

  public getPorcentajeEspecie(cantidad: number): number {
    const total = this.kpis().totalMascotas;
    if (total === 0) return 0;
    return Math.round((cantidad / total) * 100);
  }

  public getTasaAdopcion(): number {
    const total = this.kpis().totalAdopciones;
    if (total === 0) return 0;
    return Math.round((this.kpis().adopcionesAprobadas / total) * 100);
  }

  public reiniciarDatos(): void {
    if (confirm('¿Deseas restaurar los datos del sistema a los valores de demostración iniciales?')) {
      this.petService.reiniciarDatos();
    }
  }
}
