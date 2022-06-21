import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TopicsComponent} from "./topics/topics.component";
import {PostPageComponent} from "./post-page/post-page.component";
import {LayoutComponent} from "./page/layout/layout.component";
import {PostsComponent} from "./page/posts/posts.component";
import {AboutComponent} from "./page/about/about.component";
import {LeaderboardComponent} from "./page/leaderboard/leaderboard.component";
import {MembersComponent} from "./page/members/members.component";
import {SettingsComponent} from "./page/settings/settings.component";
import {GeneralComponent} from "./page/settings/general/general.component";
import {QuestionsComponent} from "./page/settings/questions/questions.component";
import {GameComponent} from "./game/game.component";
import {AdminsComponent} from "./page/settings/admins/admins.component";

const routes: Routes = [
  {path: '', component: TopicsComponent},
  {
    path: ':topicId', component: LayoutComponent, children: [
      {path: '', component: PostsComponent},
      {path: 'about', component: AboutComponent},
      {path: 'leaderboard', component: LeaderboardComponent},
      {path: 'members', component: MembersComponent},
    ]
  },
  {
    path: ':topicId/settings', component: SettingsComponent, children: [
      {path: '', redirectTo: 'general', pathMatch: 'full'},
      {path: 'general', component: GeneralComponent},
      {path: 'admins', component: AdminsComponent},
      {path: 'questions', component: QuestionsComponent},
    ]
  },
  {path: ':topicId/post/:postId', component: PostPageComponent},
  {path: ':topicId/game', component: GameComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopicsRoutingModule {
}
