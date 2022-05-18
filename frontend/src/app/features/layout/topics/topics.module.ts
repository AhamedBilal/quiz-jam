import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopicsRoutingModule } from './topics-routing.module';
import { TopicsComponent } from './topics/topics.component';
import { TopicPageComponent } from './topic-page/topic-page.component';
import { PostPageComponent } from './post-page/post-page.component';


@NgModule({
  declarations: [
    TopicsComponent,
    TopicPageComponent,
    PostPageComponent
  ],
  imports: [
    CommonModule,
    TopicsRoutingModule
  ]
})
export class TopicsModule { }
