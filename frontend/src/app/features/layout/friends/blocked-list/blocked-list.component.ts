import { Component, OnInit } from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";
import {waitFor} from "../../../../config/shared";

@Component({
  selector: 'app-blocked-list',
  templateUrl: './blocked-list.component.html',
  styleUrls: ['./blocked-list.component.scss']
})
export class BlockedListComponent implements OnInit {


  friends: any[] = [];

  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) { }


  async ngOnInit() {
    this.spinner.show();
    await waitFor(1000);
    this.spinner.hide();
    this.friends = [
      {
        name: 'Ravindu',
        img: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVvcGxlfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60'
      },
      {
        name: 'Manju',
        img: 'https://images.pexels.com/photos/445109/pexels-photo-445109.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      {
        name: 'Maliya',
        img: 'https://images.pexels.com/photos/845457/pexels-photo-845457.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
    ];
  }

  async remove(i: number) {
    this.spinner.show();
    await waitFor(2000)
    this.friends.splice(i, 1);
    this.toastr.success('User Unblocked');
    this.spinner.hide();
  }
}
