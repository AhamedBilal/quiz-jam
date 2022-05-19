import {Component, OnInit} from '@angular/core';

// @ts-ignore
import countries from '../../../../assets/json/countries.json';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../core/services/auth.service";
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  hide = true;


  countries = countries;
  formGroup: FormGroup;
  genders = [
    {name: 'Male', code: 'M'},
    {name: 'Female', code: 'F'},
    {name: 'Other', code: 'O'}
  ];
  startDate = new Date(2000, 0, 1);

  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router,
  ) {
    this.formGroup = fb.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      dob: [null, [Validators.required]],
      country: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      password: [null, [Validators.required]],
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
    this.service.signUp(this.formGroup.value).subscribe(value => {
      this.spinner.hide();
      localStorage.setItem('token', value.token);
      this.toastr.success('ACCOUNT SUCCESSFULLY CREATED');
      this.toastr.success('VERIFICATION EMAIL SENT TO YOUR ACCOUNT', '', {timeOut: 5000});
      this.router.navigate(['auth/login']);
    });


  }
}
