import { Routes } from '@angular/router';
//import { PrimerRegistroComponent } from './primer-registro/primer-registro.component';
import { ArchivosComponent } from './archivos.component';
import { OrdenesDiaComponent } from './ordenes-dia/ordenes-dia.component';

export const ArchivosRoutes: Routes = [
    {
        path: '',
        component: ArchivosComponent,
        data: {
            title: 'Archivos Transparencia',
        },
    },
      {
          path: 'ordenes-dia',
          component: OrdenesDiaComponent,
          data: {
              title: 'Ordenes del día',
              urls: [
                  { title: 'Ordenes del día', url: '/ordenes-dia' },
                  { title: 'Ordenes del día' }
              ]
          },
      },

   
   
   
];
