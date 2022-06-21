import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";
import {FilterDialogComponent} from "./filter-dialog/filter-dialog.component";
import {waitFor} from "../../../../config/shared";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  filter = {
    name: '',
    country: '',
    gender: '',
    topics: []
  }

  friends: any[] = [];

  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {
  }

  async ngOnInit() {
    this.spinner.show();
    await waitFor(1000);
    this.spinner.hide();
    this.friends = [
      {
        name: 'Nipuna',
        img: 'https://images.pexels.com/photos/775358/pexels-photo-775358.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      {
        name: 'Ayasha',
        img: 'https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      {
        name: 'Kevin',
        img: 'https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
    ];
  }

  addFriend(i: number) {

  }

  openFilter() {
    const dialogRef = this.dialog.open(FilterDialogComponent, {
      width: '500px',
      data: this.filter,
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        this.filter = result;
        this.spinner.show();
        await waitFor(2000);
        this.spinner.hide();
        this.friends = [
          {
            name: 'Ayasha',
            img: 'https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?auto=compress&cs=tinysrgb&w=600'
          }
        ];
      }
    });
  }
}
