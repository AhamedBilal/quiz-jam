import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../../../core/services/category.service";
import {TopicService} from "../../../../core/services/topic.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {data} from "autoprefixer";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-topic-dialog',
  templateUrl: './topic-dialog.component.html',
  styleUrls: ['./topic-dialog.component.scss']
})
export class TopicDialogComponent implements OnInit {
  formGroup: FormGroup;
  categories: any[] = [];

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private categoryService: CategoryService,
    private topicService: TopicService,
    public dialogRef: MatDialogRef<TopicDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.formGroup = fb.group({
      name: [null, Validators.required],
      CategoryId: [null, Validators.required]
    })
  }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoryService.getAll().subscribe(value => {
      this.categories = value.rows;
    })
  }

  create() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    const obj = {
      ...this.formGroup.value,
      UserId: this.data
    }

    this.spinner.show();
    this.topicService.create(obj).subscribe(value => {
      console.log(value);
      this.spinner.hide();
      this.toastr.success('TOPIC CREATED');
      this.dialogRef.close('created');
    })
  }

}
