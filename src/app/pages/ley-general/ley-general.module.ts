import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { LeyGeneralRoutes } from './ley-general.routing';




@NgModule({
    declarations: [
],
    imports: [
        CommonModule,
        RouterModule.forChild(LeyGeneralRoutes),
        SharedModule
    ]
})

export class LeyGeneralModule { }