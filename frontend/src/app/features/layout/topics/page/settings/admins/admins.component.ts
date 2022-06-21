import {Component, OnInit} from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";
import {waitFor} from "../../../../../../config/shared";

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent implements OnInit {
  owners: any[] = []

  admins = [];


  constructor(private spinner: NgxSpinnerService) {

  }

  async ngOnInit() {
    this.spinner.show();
    await waitFor(1000);
    this.spinner.hide();
    this.owners = [
      {
        name: 'Ahamed Bilal',
        img: 'http://localhost:4300/assets/1623408653069.png'
      }
    ];
  }

}
