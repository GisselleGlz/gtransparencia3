import { Routes } from '@angular/router';
import { ProyectosEspecialesComponent } from './proyectos-especiales.component';

export const ProyectosRoutes: Routes = [
    {
        path: '',
        component: ProyectosEspecialesComponent,
        data: {
            title: 'Proyectos Especiales',
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
    //  {
    //      path: 'editar/:id',
    //      component: PrimerRegistroComponent,
    //      data: {
    //          title: 'Editar Registro',
    //          urls: [
    //              { title: 'Registro', url: '/primer-registro' },
    //              { title: 'Editar' }
    //          ]
    //      },
    //  },
];
