import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import {AuthService} from "../../../core/services/auth.service";
import {Router} from "@angular/router";
import {waitFor} from "../../../config/shared";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  formGroup: FormGroup;
  hide = true;

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

  async onSubmit() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    this.spinner.show();
    await waitFor(2000);
    this.spinner.hide();
    localStorage.setItem('token', 'sdsfsdfdsfsdfs');
    this.router.navigate(['']);
    this.toastr.success('LOGIN SUCCESSFUL');
    // this.service.login(this.formGroup.value).subscribe(value => {
    //   this.spinner.hide();
    //   console.log(value);
    //
    // });


  }

}
