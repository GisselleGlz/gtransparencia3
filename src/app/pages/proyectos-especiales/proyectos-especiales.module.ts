import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ProyectosRoutes } from './proyectos-especiales.routing';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
    declarations: [
       // AtencionComponent,
        //PrimerRegistroComponent
       // ListarCargoComponent,
        
],
    imports: [
        CommonModule,
        RouterModule.forChild(ProyectosRoutes),
        SharedModule
    ]
})

export class ProyectosModule { }