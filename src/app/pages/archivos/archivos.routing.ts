import { Routes } from '@angular/router';
//import { PrimerRegistroComponent } from './primer-registro/primer-registro.component';
import { ArchivosComponent } from './archivos.component';

export const ArchivosRoutes: Routes = [
    {
        path: '',
        component: ArchivosComponent,
        data: {
            title: 'Archivos Transparencia',
        },
    },
    //  {
    //      path: 'primer-registro',
    //      component: PrimerRegistroComponent,
    //      data: {
    //          title: 'Primer Registro',
    //          urls: [
    //              { title: 'Registro', url: '/primer-registro' },
    //              { title: 'Registro' }
    //          ]
    //      },
    //  },

   
   
   
];
