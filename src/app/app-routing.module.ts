import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { LoginComponent } from './authentication/login/login.component';

import { NotfoundComponent } from './authentication/404/not-found.component';

import { InicioComponent } from './pages/inicio/inicio.component';
import { AuthGuard } from './services/guards/auth-guard.service';
import { RegistroComponent } from './authentication/registro/registro.component';

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      {
        path: 'starter',
        canActivate: [AuthGuard],
        loadChildren: () => import('./starter/starter.module').then(m => m.StarterModule)
      },
      {
        path: 'inicio',
        canActivate: [AuthGuard],
        
        component: InicioComponent
      },
      {
        path: 'registro',
        //canActivate: [AuthGuard],
        component: RegistroComponent
      },
      {
        path: 'usuarios',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./pages/configuracion/usuarios/usuarios.module').then(
            (m) => m.UsuariosModule
          ),
      },
      
     
      
      {
        path: 'archivos',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./pages/archivos/archivos.module').then(
            (m) => m.ArchivosModule
          ),
      },
      
      

    ]
  },

  { path: 'login', component: LoginComponent },
  { path: '404', component: NotfoundComponent },
  { path: '**', redirectTo: '/404' },
];
