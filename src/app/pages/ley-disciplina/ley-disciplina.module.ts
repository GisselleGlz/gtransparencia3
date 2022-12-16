import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { LeyDisciplinaRoutes } from './ley-disciplina.routing';




@NgModule({
    declarations: [
],
    imports: [
        CommonModule,
        RouterModule.forChild(LeyDisciplinaRoutes),
        SharedModule
    ]
})

export class LeyDisciplinaModule { }