import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadComponent: () => import('./pages/inicio/inicio').then(m => m.InicioComponent),
    title: 'PetShop · Inicio'
  },
  {
    path: 'nosotros',
    loadComponent: () => import('./pages/nosotros/nosotros').then(m => m.NosotrosComponent),
    title: 'PetShop · Nosotros'
  },
  {
    path: 'mascotas',
    loadComponent: () => import('./pages/mascotas/mascotas').then(m => m.MascotasComponent),
    title: 'PetShop · Registro de Mascotas'
  },
  {
    path: 'clientes',
    loadComponent: () => import('./pages/clientes/clientes').then(m => m.ClientesComponent),
    title: 'PetShop · Registro de Clientes'
  },
  {
    path: 'adopciones',
    loadComponent: () => import('./pages/adopciones/adopciones').then(m => m.AdopcionesComponent),
    title: 'PetShop · Solicitud de Adopción'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.DashboardComponent),
    title: 'PetShop · Dashboard de Indicadores'
  },
  {
    path: '**',
    redirectTo: 'inicio'
  }
];
