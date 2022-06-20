import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-question-dialog',
  templateUrl: './question-dialog.component.html',
  styleUrls: ['./question-dialog.component.scss']
})
export class QuestionDialogComponent implements OnInit {
  formGroup: any;

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<QuestionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.formGroup = fb.group({
      question: ['', Validators.required],
      img: [''],
      ans1: ['', Validators.required],
      ans2: ['', Validators.required],
      ans3: ['', Validators.required],
      ans4: ['', Validators.required],
    })
  }

  get img() {
    return this.formGroup.get('img');
  }


  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    console.log(event.target.files[0].name);
    this.formGroup.patchValue({img: event.target.files[0].name});
  }

  clear() {
    this.formGroup.patchValue({img: null});
  }

  create() {

  }
}
