import { Routes } from '@angular/router';
import { LeyGeneralComponent } from './ley-general.component';

export const LeyGeneralRoutes: Routes = [
    {
        path: '',
        component: LeyGeneralComponent,
        data: {
            title: 'Ley General de Contabiliadad Gubernamental',
        },
    },
    //    {
    //        path: 'financiera-laredo',
    //        component: FinancieraLaredoComponent,
    //        data: {
    //            title: 'Ley de Disciplina Financiera',
    //            urls: [
    //                { title: 'Disciplina Financiera', url: '/financiera-laredo' },
    //                { title: 'Nuevo Laredo, Tamaulipas' }
    //            ]
    //        },
    //    },

   
   
   
];
