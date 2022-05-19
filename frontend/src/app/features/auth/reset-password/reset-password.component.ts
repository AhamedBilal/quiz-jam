import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import {AuthService} from "../../../core/services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  formGroup: FormGroup;
  token: any;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute,
    private service: AuthService
  ) {
    this.formGroup = fb.group({password: [null, [Validators.required]]});
    if (!route.snapshot.queryParamMap.has('token')) {
      toastr.error('INVALID URI');
      this.router.navigate(['auth/login']);
      return;
    }
    this.token = route.snapshot.queryParamMap.get('token');
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    this.spinner.show();
    this.service.resetPassword(this.formGroup.value, this.token).subscribe(value => {
      this.toastr.success('PASSWORD SUCCESSFULLY CHANGED');
      this.router.navigate(['auth/login'])
      this.spinner.hide();
    });

  }

}

