import {Component, OnInit} from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";
import {waitFor} from "../../../../../config/shared";
import {QuestionDialogComponent} from "../settings/questions/question-dialog/question-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {CreatePostComponent} from "../create-post/create-post.component";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts: any[] = [];
  tempPosts = [
    {
      postedBy: 'Ahamed Bilal',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquam aperiam consequatur eos error facilis id ipsum nostrum praesentium ullam? Eius laborum maiores quam veritatis. Accusamus ea eius ipsa quo.',
      img: 'http://localhost:4300/assets/topic-cover.jpg',
      liked: true
    }, {
      postedBy: 'Randika',
      description: 'Hello testing post',
      img: null,
      liked: true
    }, {
      postedBy: 'Achala',
      description: 'sfdsfsdfdsfsdfsdfsdfsdfsdfsdds',
      img: 'https://images.pexels.com/photos/167682/pexels-photo-167682.jpeg?auto=compress&cs=tinysrgb&w=600',
      liked: false
    }, {
      postedBy: 'Achala',
      description: 'sdhgsdhgdsghsdhjsdjhsjsdsakjsakjsajkasasjkskja',
      liked: false
    }, {
      postedBy: 'Shehan',
      description: 'Test',
      img: 'https://images.pexels.com/photos/374918/pexels-photo-374918.jpeg?auto=compress&cs=tinysrgb&w=600',
      liked: false
    },
  ]

  about: any;

  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {
  }

  async ngOnInit() {
    await this.spinner.show();
    await waitFor(2500);
    this.posts = this.tempPosts;
    this.about =  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa, cupiditate dicta\n' +
      '          dignissimos doloremque\n' +
      '          eaque eveniet ipsa laborum mollitia odit omnis quae quidem quod reiciendis repellat sapiente sint tenetur,\n' +
      '          veritatis voluptas.';
    await this.spinner.hide();
  }


  createPost(data?: any) {
    const dialogRef = this.dialog.open(CreatePostComponent, {
      width: '800px',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
