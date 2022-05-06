import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout/layout.component';
import {OverlayModule} from "@angular/cdk/overlay";
import {MatDividerModule} from "@angular/material/divider";


@NgModule({
  declarations: [
    LayoutComponent,
  ],
    imports: [
        CommonModule,
        LayoutRoutingModule,
        OverlayModule,
        MatDividerModule
    ]
})
export class LayoutModule { }
