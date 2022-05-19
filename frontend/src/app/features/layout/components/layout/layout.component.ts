import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../core/services/auth.service";
import {DataService} from "../../../../core/services/data.service";
import {NgxSpinnerService} from "ngx-spinner";
import {MatDialog} from "@angular/material/dialog";
import {TopicDialogComponent} from "../topic-dialog/topic-dialog.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  isProfileMenuOpen = false;

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {

    this.createTopic();

    this.authService.getUserDetails().subscribe(value => {
      console.log(value);
    })

  }

  logout() {
    localStorage.clear();
    this.router.navigate(['auth/login']);
  }

  createTopic() {
    const dialogRef = this.dialog.open(TopicDialogComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
