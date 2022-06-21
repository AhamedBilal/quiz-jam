import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopicsRoutingModule } from './topics-routing.module';
import { TopicsComponent } from './topics/topics.component';
import { TopicPageComponent } from './topic-page/topic-page.component';
import { PostPageComponent } from './post-page/post-page.component';
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatTabsModule} from "@angular/material/tabs";
import { PostsComponent } from './page/posts/posts.component';
import { AboutComponent } from './page/about/about.component';
import { LeaderboardComponent } from './page/leaderboard/leaderboard.component';
import { MembersComponent } from './page/members/members.component';
import { SettingsComponent } from './page/settings/settings.component';
import { LayoutComponent } from './page/layout/layout.component';
import {MatMenuModule} from "@angular/material/menu";
import { CreatePostComponent } from './page/create-post/create-post.component';
import {MatListModule} from "@angular/material/list";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import { GeneralComponent } from './page/settings/general/general.component';
import { QuestionsComponent } from './page/settings/questions/questions.component';
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTableModule} from "@angular/material/table";
import { QuestionDialogComponent } from './page/settings/questions/question-dialog/question-dialog.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDialogModule} from "@angular/material/dialog";
import { GameComponent } from './game/game.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { AdminsComponent } from './page/settings/admins/admins.component';

@NgModule({
  declarations: [
    TopicsComponent,
    TopicPageComponent,
    PostPageComponent,
    PostsComponent,
    AboutComponent,
    LeaderboardComponent,
    MembersComponent,
    SettingsComponent,
    LayoutComponent,
    CreatePostComponent,
    GeneralComponent,
    QuestionsComponent,
    QuestionDialogComponent,
    GameComponent,
    AdminsComponent
  ],
  imports: [
    CommonModule,
    TopicsRoutingModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatMenuModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ]
})
export class TopicsModule { }
