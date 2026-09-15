import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PetShopService } from '../../services/pet-shop.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './inicio.html',
  styleUrls: ['./inicio.scss']
})
export class InicioComponent {
  private petService = inject(PetShopService);
  public kpis = this.petService.kpis;
  public mascotas = this.petService.mascotas;
}
