import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FriendsRoutingModule } from './friends-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { SearchComponent } from './search/search.component';
import { BlockedListComponent } from './blocked-list/blocked-list.component';
import { FriendsComponent } from './friends/friends.component';
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTooltipModule} from "@angular/material/tooltip";
import { RequestsComponent } from './requests/requests.component';
import { FilterDialogComponent } from './search/filter-dialog/filter-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatChipsModule} from "@angular/material/chips";
import {MatAutocompleteModule} from "@angular/material/autocomplete";


@NgModule({
  declarations: [
    LayoutComponent,
    SearchComponent,
    BlockedListComponent,
    FriendsComponent,
    RequestsComponent,
    FilterDialogComponent,
  ],
  imports: [
    CommonModule,
    FriendsRoutingModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatChipsModule,
    FormsModule,
    MatAutocompleteModule
  ]
})
export class FriendsModule { }
