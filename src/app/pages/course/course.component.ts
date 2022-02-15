import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})

export class CourseComponent implements OnInit {
  dialogContent: string = "";
  displayDialog: boolean = false;
  isLinear: boolean = false;
  visibleSidebar2: boolean = false;
  constructor() { }
  //courseNameFormGroup: FormGroup = new FormGroup;
  ngOnInit(): void {
  }
  courseNameFormGroup = new FormGroup({
    courseName : new FormControl(null, [Validators.required, Validators.maxLength(100), Validators.minLength(4)]),
  })
}
