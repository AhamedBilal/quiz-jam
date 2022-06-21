import {Component, OnInit} from '@angular/core';
import {TopicService} from "../../../../core/services/topic.service";
import {CategoryService} from "../../../../core/services/category.service";
import {NgxSpinnerService} from "ngx-spinner";
import {waitFor} from "../../../../config/shared";
import {DataService} from "../../../../core/services/data.service";

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit {

  categoryTopics: any[] = [];

  tempCategoryTopics: any[] = [
    {
      name: 'Mathematics',
      topics: [
        {
          name: 'Basic Maths',
          img: 'assets/topic-profile.jpg'
        },
        {
          name: 'Algebra',
          img: 'https://images.pexels.com/photos/6238050/pexels-photo-6238050.jpeg?auto=compress&cs=tinysrgb&w=600'
        },
        {
          name: 'Fraction',
          img: 'https://leverageedu.com/blog/wp-content/uploads/2020/06/What-is-Fraction_.jpg'
        },
        {
          name: 'Multiplication',
          img: 'https://images.pexels.com/photos/4386323/pexels-photo-4386323.jpeg?auto=compress&cs=tinysrgb&w=600'
        },
        {
          name: 'Subtraction',
          img: 'https://images.pexels.com/photos/6624378/pexels-photo-6624378.jpeg?auto=compress&cs=tinysrgb&w=600'
        },
        {
          name: 'Addition',
          img: 'https://images.pexels.com/photos/6624378/pexels-photo-6624378.jpeg?auto=compress&cs=tinysrgb&w=600'
        },
      ]
    },
    {
      name: 'Geography',
      topics: [
        {
          name: 'Name the Flag',
          img: 'https://images.pexels.com/photos/2192936/pexels-photo-2192936.jpeg?auto=compress&cs=tinysrgb&w=600'
        },
        {
          name: 'Country',
          img: 'https://images.pexels.com/photos/335393/pexels-photo-335393.jpeg?auto=compress&cs=tinysrgb&w=600'
        },
        {
          name: 'City',
          img: 'https://images.pexels.com/photos/1308940/pexels-photo-1308940.jpeg?auto=compress&cs=tinysrgb&w=600'
        },
      ]
    },
    {
      name: 'Science',
      topics: [
        {
          name: 'Elements',
          img: 'https://images.pexels.com/photos/954585/pexels-photo-954585.jpeg?auto=compress&cs=tinysrgb&w=600'
        },
        {
          name: 'Basic Science',
          img: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=600'
        },
        {
          name: 'Chemistry',
          img: 'https://images.pexels.com/photos/8539752/pexels-photo-8539752.jpeg?auto=compress&cs=tinysrgb&w=600'
        },
      ]
    },
  ];

  constructor(
    private topicService: TopicService,
    private spinner: NgxSpinnerService,
    private categoryService: CategoryService,
    private dataService: DataService
  ) {
  }

  async ngOnInit() {
    this.spinner.show();
    await waitFor(2000);
    this.spinner.hide();
    this.categoryTopics = [...this.tempCategoryTopics];

    // this.getAllTopicWithCategories();
    this.dataService.currentUserData.subscribe(value => {
      if (value) {
        this.categoryTopics[2].topics.push({name: 'Biology', img: null});
      }
    });
  }

  // getAllTopicWithCategories() {
  //   this.categoryService.getAllWithTopics().subscribe(value => {
  //     console.log(value);
  //     this.categoryTopics = value.rows;
  //   })
  // }

}
