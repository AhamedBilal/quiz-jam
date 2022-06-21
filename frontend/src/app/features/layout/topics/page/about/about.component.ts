import {Component, OnInit} from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";
import {waitFor} from "../../../../../config/shared";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  about: any
  questions = 0;
  players = 0;

  constructor(private spinner: NgxSpinnerService) {

  }

  async ngOnInit() {
    this.spinner.show();
    await waitFor(1000);
    this.spinner.hide();
    this.questions = 11;
    this.players = 28;
    this.about = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid cupiditate facilis hic illo libero modi mollitia perferendis placeat, porro quibusdam quis quod rem, temporibus, veritatis voluptas voluptatibus voluptatum? Expedita, ipsum.';
  }

}
