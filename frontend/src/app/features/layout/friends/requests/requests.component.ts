import {Component, OnInit} from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";
import {waitFor} from "../../../../config/shared";

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {

  friends: any[] = [];

  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {
  }

  async ngOnInit() {
    this.spinner.show();
    await waitFor(1100);
    this.spinner.hide();
    this.friends = [
      {
        name: 'Hashan',
        img: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVvcGxlfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60'
      },
      {
        name: 'Asma',
        img: 'https://images.unsplash.com/photo-1528271537-64e11fc31bba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGVvcGxlfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60'
      },
      {
        name: 'Shehan',
        img: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHBlb3BsZXxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60'
      },
    ];

  }

  remove(i: number) {

  }
}
