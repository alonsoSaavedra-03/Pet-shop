import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="text-secondary pt-5 pb-4 mt-auto border-top" style="background-color: #0f172a; color: #94a3b8 !important;">
      <div class="container">
        <div class="row g-4">
          <div class="col-lg-4 col-md-6">
            <h5 class="fw-bold d-flex align-items-center gap-2 mb-3 text-white">
              <i class="bi bi-paw-fill text-primary"></i>
              <span>PetShop</span>
            </h5>
            <p class="small mb-3">
              Sistema de gestión para el registro digitalizado de mascotas, clientes y solicitudes de adopción responsable.
            </p>
            <div class="small">
              <span class="badge bg-secondary me-2">Angular 18+</span>
              <span class="badge bg-secondary">Formularios Validados</span>
            </div>
          </div>

          <div class="col-lg-2 col-md-6">
            <h6 class="text-uppercase fw-bold text-white mb-3 small">Navegación</h6>
            <ul class="list-unstyled small mb-0 d-flex flex-column gap-2">
              <li><a routerLink="/inicio" class="text-decoration-none text-secondary hover-white">Inicio</a></li>
              <li><a routerLink="/nosotros" class="text-decoration-none text-secondary hover-white">Nosotros</a></li>
              <li><a routerLink="/mascotas" class="text-decoration-none text-secondary hover-white">Mascotas</a></li>
              <li><a routerLink="/clientes" class="text-decoration-none text-secondary hover-white">Clientes</a></li>
              <li><a routerLink="/adopciones" class="text-decoration-none text-secondary hover-white">Adopciones</a></li>
              <li><a routerLink="/dashboard" class="text-decoration-none text-secondary hover-white">Dashboard</a></li>
            </ul>
          </div>

          <div class="col-lg-3 col-md-6">
            <h6 class="text-uppercase fw-bold text-white mb-3 small">Servicios</h6>
            <ul class="list-unstyled small mb-0 d-flex flex-column gap-2">
              <li><i class="bi bi-check2 text-primary me-2"></i> Venta de Mascotas</li>
              <li><i class="bi bi-check2 text-primary me-2"></i> Servicios Veterinarios</li>
              <li><i class="bi bi-check2 text-primary me-2"></i> Accesorios y Nutrición</li>
              <li><i class="bi bi-check2 text-primary me-2"></i> Procesos de Adopción</li>
            </ul>
          </div>

          <div class="col-lg-3 col-md-6">
            <h6 class="text-uppercase fw-bold text-white mb-3 small">Contacto</h6>
            <p class="small mb-1"><i class="bi bi-geo-alt me-2"></i> Av. Primavera 1024, Lima - Perú</p>
            <p class="small mb-1"><i class="bi bi-telephone me-2"></i> +51 (01) 456-7890</p>
            <p class="small mb-0"><i class="bi bi-envelope me-2"></i> contacto&#64;petshop.com</p>
          </div>
        </div>

        <hr class="border-secondary border-opacity-25 my-4">

        <div class="d-flex flex-wrap justify-content-between align-items-center small">
          <div>&copy; 2026 PetShop. Todos los derechos reservados. Taller de Desarrollo Web.</div>
          <div>GitHub: <a href="https://github.com/alonsoSaavedra-03" target="_blank" class="text-white text-decoration-none"><i class="bi bi-github me-1"></i>alonsoSaavedra-03</a></div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .hover-white:hover {
      color: #ffffff !important;
    }
  `]
})
export class FooterComponent {}
