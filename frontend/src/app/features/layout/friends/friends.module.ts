import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FriendsRoutingModule } from './friends-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { SearchComponent } from './search/search.component';
import { BlockedListComponent } from './blocked-list/blocked-list.component';
import { FriendsComponent } from './friends/friends.component';
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    LayoutComponent,
    SearchComponent,
    BlockedListComponent,
    FriendsComponent
  ],
  imports: [
    CommonModule,
    FriendsRoutingModule,
    MatListModule,
    MatIconModule
  ]
})
export class FriendsModule { }
