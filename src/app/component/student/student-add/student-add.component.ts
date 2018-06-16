import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Student} from "../../../model/student";
import {StudentService} from "../../../service/student.service";

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})
export class StudentAddComponent implements OnInit {

  @Output() onStudentAdded: EventEmitter<Student>;

  constructor(private studentService:StudentService) {
    this.onStudentAdded = new EventEmitter<Student>();
  }

  addStudent(name:HTMLInputElement, surname:HTMLInputElement, indexNr:HTMLInputElement):boolean{
    if(name.value === "" || surname.value === "" || indexNr.value === "" ) {
      return false;
    }
    this.studentService.addStudent(new Student(name.value, surname.value, parseInt(indexNr.value))).subscribe( s => this.onStudentAdded.emit(s));
    return false;
  }

  ngOnInit() {
  }

}
