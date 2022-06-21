import {Component, OnInit} from '@angular/core';
import {waitFor} from "../../../../config/shared";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  friends: any[] = [];

  constructor(private spinner: NgxSpinnerService) {
  }

  async ngOnInit() {
    this.spinner.show();
    await waitFor(1000);
    this.spinner.hide();
    this.friends = [
      {
        name: 'Achala Saliya',
        img: 'https://images.pexels.com/photos/3748221/pexels-photo-3748221.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      {
        name: 'Asma ',
        img: 'https://images.unsplash.com/photo-1528271537-64e11fc31bba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGVvcGxlfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60'
      },
      {
        name: 'Randika Nonis',
        img: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHBlb3BsZXxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60'
      },
    ];
  }

  remove(i: number) {

  }
}
