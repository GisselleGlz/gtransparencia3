import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { LoginComponent } from './authentication/login/login.component';

import { NotfoundComponent } from './authentication/404/not-found.component';

import { InicioComponent } from './pages/inicio/inicio.component';
import { AuthGuard } from './services/guards/auth-guard.service';
import { RegistroComponent } from './authentication/registro/registro.component';
import { LeyDisciplinaModule } from './pages/ley-disciplina/ley-disciplina.module';
import { LeyGeneralModule } from './pages/ley-general/ley-general.module';

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
      {
        path: 'disciplina',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./pages/ley-disciplina/ley-disciplina.module').then(
            (m) => m.LeyDisciplinaModule
          ),
      },
      {
        path: 'general',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./pages/ley-general/ley-general.module').then(
            (m) => m.LeyGeneralModule
          ),
      },
      
      

    ]
  },

  { path: 'login', component: LoginComponent },
  { path: '404', component: NotfoundComponent },
  { path: '**', redirectTo: '/404' },
];
