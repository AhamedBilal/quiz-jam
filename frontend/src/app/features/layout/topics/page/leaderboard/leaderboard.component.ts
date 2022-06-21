import {Component, OnInit} from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";
import {waitFor} from "../../../../../config/shared";

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
  dataSource: any = [];
  dataTemp = [
    {name: 'Ahamed Bilal', xp: 2420},
    {name: 'Achala saliya', xp: 1755},
    {name: 'Randika', xp: 1500},
    {name: 'Shehan', xp: 1420},
    {name: 'Kevin', xp: 520},
    {name: 'Isuru', xp: 350},
    {name: 'Kalana', xp: 200},
  ];
  displayedColumns = ['rank', 'name', 'country', 'xp'];

  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {
  }

  async ngOnInit() {
    await this.spinner.show();
    await waitFor(2000);
    this.dataSource = [...this.dataTemp];
    await this.spinner.hide();
  }

  async change() {
    this.dataSource = [];
    await this.spinner.show();
    await waitFor(2000);
    this.dataSource = [...this.dataTemp];
    await this.spinner.hide();
  }
}
