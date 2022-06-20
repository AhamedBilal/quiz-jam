import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {
  categories = ['Mathematics', 'Geography', 'General', 'Languages', 'Education'];
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {
    this.formGroup = fb.group({
      name: ['', Validators.required],
      about: ['', Validators.required],
      guidelines: [''],
      category: ['', Validators.required],
      img: ['']
    });
  }

  get img() {
    return this.formGroup.get('img');
  }

  ngOnInit(): void {
    this.formGroup.patchValue({
      name: 'Basic Maths',
      about: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa, cupiditate dicta dignissimos doloremque eaque eveniet ipsa laborum mollitia odit omnis quae quidem quod reiciendis repellat sapiente sint tenetur, veritatis voluptas.',
      category: 'Mathematics',
      img: 'bg-img000001.jpg'
    })
  }

  onFileSelected(event: any) {
    console.log(event.target.files[0].name);
    this.formGroup.patchValue({img: event.target.files[0].name});
  }

  clear() {
    this.formGroup.patchValue({img: null});
  }
}
