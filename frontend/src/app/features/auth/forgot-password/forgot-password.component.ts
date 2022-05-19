import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import {AuthService} from "../../../core/services/auth.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private service: AuthService
  ) {
    this.formGroup = fb.group({email: [null, [Validators.required, Validators.email]]});
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    this.spinner.show();
    this.service.forgotPassword(this.formGroup.value).subscribe(value => {
      this.toastr.success('REST LINK SENT TO YOUR EMAIL ADDRESS!');
      this.spinner.hide();
    });

  }

}
