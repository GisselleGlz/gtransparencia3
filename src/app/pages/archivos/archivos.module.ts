import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';


import { ArchivosRoutes } from './archivos.routing';

@NgModule({
    declarations: [
       // AtencionComponent,
        //PrimerRegistroComponent
       // ListarCargoComponent,
],
    imports: [
        CommonModule,
        RouterModule.forChild(ArchivosRoutes),
        SharedModule
    ]
})

export class ArchivosModule { }