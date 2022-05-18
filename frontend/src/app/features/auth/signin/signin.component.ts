import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.formGroup = fb.group({
      email: [null, Validators.required],
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


  }

}
