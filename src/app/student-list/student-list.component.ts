import { Component, OnInit } from '@angular/core';
import {StudentService} from '../student.service';
import {Student} from "../student";
declare var jQuery:any;

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  students:Student[] = [];

  constructor(private studentService:StudentService) {
  }

  ngOnInit() {
    this.studentService.getStudents().subscribe(
      (s) => {
        this.students = s;
      },
      err => {
        console.log(err);
      },
      () => {
        console.log(this.students);
      }
    )
  }

  getService() {
    return this.studentService;
  }

  studentDeleted(student:Student) {
    console.log(student.name + " was deleted");
    this.students.splice(this.students.indexOf(student), 1);
  }

  studentAdded(student:Student) {
    console.log(student.name + " was added");
    this.students.push(student);
  }
}
