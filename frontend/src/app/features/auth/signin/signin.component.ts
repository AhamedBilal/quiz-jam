import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import {AuthService} from "../../../core/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router,
  ) {
    this.formGroup = fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    this.spinner.show();
    this.service.login(this.formGroup.value).subscribe(value => {
      this.spinner.hide();
      console.log(value);
      localStorage.setItem('token', value.token);
      this.router.navigate(['']);
      this.toastr.success('LOGIN SUCCESSFUL');
    });


  }

}
