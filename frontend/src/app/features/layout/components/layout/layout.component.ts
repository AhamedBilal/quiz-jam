import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../core/services/auth.service";
import {DataService} from "../../../../core/services/data.service";
import {NgxSpinnerService} from "ngx-spinner";

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
  ) {
  }

  ngOnInit(): void {

    this.authService.getUserDetails().subscribe(value => {
      console.log(value);
    })

  }

  logout() {

  }
}
