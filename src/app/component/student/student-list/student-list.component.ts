import { Component, OnInit } from '@angular/core';
import {Student} from "../../../model/student";
import {StudentService} from "../../../service/student.service";
import {AuthService} from "../../../service/auth.service";

declare var jQuery:any;

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  students:Student[] = [];

  constructor(private studentService:StudentService, private auth:AuthService) {
  }

  ngOnInit() {
    this.studentService.getStudents().subscribe(
      (s) => {
        this.students = s;
        for (let s of this.students) {
          s.thumbnailUrl = this.studentService.getAvatar(s.id);
        }
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

  studentSorted() {
    this.students = this.studentService.sortStudents(this.students);
  }

  getRole() {
    return this.auth.getRole();
  }
}
