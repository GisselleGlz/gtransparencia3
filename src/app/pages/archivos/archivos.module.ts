import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';


import { ArchivosRoutes } from './archivos.routing';
import { OrdenesDiaComponent } from './ordenes-dia/ordenes-dia.component';

@NgModule({
    declarations: [
       // AtencionComponent,
        //PrimerRegistroComponent
       // ListarCargoComponent,
OrdenesDiaComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(ArchivosRoutes),
        SharedModule
    ]
})

export class ArchivosModule { }