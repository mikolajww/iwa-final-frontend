import { Component, OnInit } from '@angular/core';
import {StudentService} from '../student.service';
declare var jQuery:any;

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  constructor(private studentService:StudentService) {
  }

  ngOnInit() {
  }

  getService() {
    return this.studentService;
  }

}
