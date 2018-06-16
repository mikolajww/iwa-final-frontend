import { Component, OnInit } from '@angular/core';
import {Student} from "../student";
import {StudentService} from "../student.service";

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})
export class StudentAddComponent implements OnInit {

  constructor(private studentService:StudentService) {
  }

  addStudent(name:HTMLInputElement, surname:HTMLInputElement, indexNr:HTMLInputElement):boolean{
    if(name.value === "" || surname.value === "" || indexNr.value === "" ) {
      return false;
    }
    this.studentService.addStudent(new Student(name.value, surname.value, parseInt(indexNr.value)));
    return false;
  }

  ngOnInit() {
  }

}
