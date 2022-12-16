import { Routes } from '@angular/router';
import { LeyDisciplinaComponent } from './ley-disciplina.component';
import { FinancieraLaredoComponent } from './financiera-laredo/financiera-laredo.component';

export const LeyDisciplinaRoutes: Routes = [
    {
        path: '',
        component: LeyDisciplinaComponent,
        data: {
            title: 'Ley de Disciplina Financiera',
        },
    },
       {
           path: 'financiera-laredo',
           component: FinancieraLaredoComponent,
           data: {
               title: 'Ley de Disciplina Financiera',
               urls: [
                   { title: 'Disciplina Financiera', url: '/financiera-laredo' },
                   { title: 'Nuevo Laredo, Tamaulipas' }
               ]
           },
       },

   
   
   
];
