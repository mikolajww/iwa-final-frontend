import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Student} from "../../../model/student";
import {StudentService} from "../../../service/student.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
declare var jQuery:any;

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})
export class StudentAddComponent implements OnInit {
  addStudentForm:FormGroup;
  @Output() onStudentAdded: EventEmitter<Student>;

  constructor(private studentService:StudentService, private fb:FormBuilder) {
    this.onStudentAdded = new EventEmitter<Student>();
    jQuery('.ui.negative.message.incorrect').hide();
    this.addStudentForm = this.fb.group({
      name:['',[Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      surname:['',[Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      idx:['',[Validators.required, Validators.pattern("[0-9]{6}")]]
    });
  }

  addStudent(name:HTMLInputElement, surname:HTMLInputElement, indexNr:HTMLInputElement):boolean{
    if(this.addStudentForm.valid) {
      this.studentService.addStudent(new Student(name.value, surname.value, parseInt(indexNr.value))).subscribe(
        s => {this.onStudentAdded.emit(s)},
        err => {
          jQuery('.ui.negative.message.incorrect').show().delay(3000).fadeOut();
          name.value = '';
          surname.value = '';
          indexNr.value = '';
        }
      );
    }
    return false;
  }

  ngOnInit() {
  }

}
