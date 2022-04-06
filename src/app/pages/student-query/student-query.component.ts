import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-student-query',
  templateUrl: './student-query.component.html',
  styleUrls: ['./student-query.component.scss']
})
export class StudentQueryComponent implements OnInit {

  myControl = new FormControl();
  //
  studentQueryForm : any;

  constructor() {

    this.studentQueryForm = new FormGroup({
      studentName : new FormControl(),
      fatherName : new FormControl(null),
      motherName : new FormControl(null),
      address : new FormControl(null),
      guardianName : new FormControl(null),
      relationToGuardian : new FormControl(null,[Validators.required]),
      educationalInstitution : new FormControl(null,[Validators.required]),
      phoneNumber : new FormControl(null,[Validators.required]),
      query : new FormControl(null,[Validators.required])
    });
  }

  ngOnInit(): void {
  }

}
