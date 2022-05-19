import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-topic-dialog',
  templateUrl: './topic-dialog.component.html',
  styleUrls: ['./topic-dialog.component.scss']
})
export class TopicDialogComponent implements OnInit {
  formGroup: FormGroup;
  categories: any;

  constructor(
    private fb: FormBuilder
  ) {
    this.formGroup = fb.group({
      name: [null, Validators.required],
      CategoryId: [null, Validators.required]
    })
  }

  ngOnInit(): void {
  }

}
