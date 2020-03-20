// Archivo de routing

// Importar los módulos del router de Angular

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importar componentes a los cuales les quiero hacer una página exclusiva
import { HomeComponent } from './components/home/home.component';
import { BlogComponent } from './components/blog/blog.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { PeliculasComponent } from './components/peliculas/peliculas.component';
import { PaginaComponent } from './components/pagina/pagina.component';
import { ErrorComponent } from './components/error/error.component';

// Array de rutas
// La ruta no encontrada se debe especificar hasta el final con el path '**'
const appRoutes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'blog', component: BlogComponent},
  {path: 'formulario', component: FormularioComponent},
  {path: 'peliculas', component: PeliculasComponent},
  {path: 'pagina-de-pruebas/', component: PaginaComponent},
  {path: 'pagina-de-pruebas/:nombre', component: PaginaComponent},
  {path: 'pagina-de-pruebas/:nombre/:apellido', component: PaginaComponent},
  {path: '**', component: ErrorComponent}
];


// Exportar el módulo de rutas
// Estos módulos se importan en app.modules.ts
// import { routing, appRoutingProviders } from './app.routing'
// En imports incluimos routing
// en providers incluimos appRoutingProviders

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
