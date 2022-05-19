import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LayoutRoutingModule} from './layout-routing.module';
import {LayoutComponent} from './components/layout/layout.component';
import {OverlayModule} from "@angular/cdk/overlay";
import {MatDividerModule} from "@angular/material/divider";
import {TopicDialogComponent} from './components/topic-dialog/topic-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";


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
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class LayoutModule {
}
