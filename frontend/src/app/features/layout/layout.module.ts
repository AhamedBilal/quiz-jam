import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LayoutRoutingModule} from './layout-routing.module';
import {LayoutComponent} from './components/layout/layout.component';
import {OverlayModule} from "@angular/cdk/overlay";
import {MatDividerModule} from "@angular/material/divider";
import {TopicDialogComponent} from './components/topic-dialog/topic-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [
    LayoutComponent,
    TopicDialogComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    OverlayModule,
    MatDividerModule,
    MatDialogModule
  ]
})
export class LayoutModule {
}
