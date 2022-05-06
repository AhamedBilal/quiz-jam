import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from "./layout/layout.component";

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      {path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
      {path: 'topics', loadChildren: () => import('./topics/topics.module').then(m => m.TopicsModule)},
      {path: 'friends', loadChildren: () => import('./friends/friends.module').then(m => m.FriendsModule)},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {
}
