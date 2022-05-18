import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TopicsComponent} from "./topics/topics.component";
import {TopicPageComponent} from "./topic-page/topic-page.component";
import {PostPageComponent} from "./post-page/post-page.component";

const routes: Routes = [
  {path: '', component: TopicsComponent},
  {path: ':topicId', component: TopicPageComponent},
  {path: ':topicId', component: PostPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopicsRoutingModule {
}
