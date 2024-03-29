import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from "./layout/layout.component";
import {SearchComponent} from "./search/search.component";
import {FriendsComponent} from "./friends/friends.component";
import {BlockedListComponent} from "./blocked-list/blocked-list.component";
import {RequestsComponent} from "./requests/requests.component";

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      {path: '', redirectTo: 'search', pathMatch: 'full'},
      {path: 'list', component: FriendsComponent},
      {path: 'requests', component: RequestsComponent},
      {path: 'search', component: SearchComponent},
      {path: 'blocked-list', component: BlockedListComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FriendsRoutingModule {
}
