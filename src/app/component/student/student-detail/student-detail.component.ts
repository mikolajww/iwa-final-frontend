import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Student} from "../../../model/student";
import {StudentService} from "../../../service/student.service";
import {Grade} from "../../../model/grade";
import {AuthService} from "../../../service/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
declare var jQuery:any;

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})

export class StudentDetailComponent implements OnInit {
  @Input() student:Student;
  detailedInfo:boolean;
  gradeAdd:boolean;
  @Output() onStudentDeleted: EventEmitter<Student>;
  editMarkForm:FormGroup;


  constructor(private studentService:StudentService, private auth:AuthService, private fb:FormBuilder) {
    this.detailedInfo = false;
    this.onStudentDeleted = new EventEmitter<Student>();
    this.createForm();
  }

  createForm() {
    this.editMarkForm = this.fb.group({
      subject: ['', Validators.required],
      grade: ['', Validators.compose([Validators.required, Validators.min(1), Validators.max(6)])],
      weight: ['', Validators.compose([Validators.required, Validators.min(1), Validators.max(5)])]
    });
  }

  ngOnInit() {
  }

  addGrade(subject:HTMLInputElement, grade:HTMLInputElement, weight:HTMLInputElement):boolean{
    if(subject.value != "" && grade.value != "" && weight.value != "") {
      this.studentService.addGradeForStudent(this.student,new Grade(subject.value, parseFloat(grade.value), parseInt(weight.value))).subscribe(
        g => this.student.grades.push(g)
      );
    }
    subject.value = "";
    grade.value = "";
    weight.value = "";
    this.toggleGradeAdd();
    return false;
  }

  editGrade(subject:HTMLInputElement, grade:HTMLInputElement, weight:HTMLInputElement, i:number):boolean {
    if(subject.value != "" && grade.value != "" && weight.value != "") {
      this.studentService.editGradeForStudent(this.student, i, new Grade(subject.value, parseFloat(grade.value), parseInt(weight.value))).subscribe(
        g => {this.student.grades[i] = g}
      );
    }
    return false;
  }

  deleteStudent():void {
    jQuery('.ui.modal').modal({
      onApprove: () => {
        this.studentService.deleteStudent(this.student).subscribe(() => {this.onStudentDeleted.emit(this.student)});
      }
    }).modal('show');
  }

  deleteGrade(grade:Grade) {
    console.log('delete grade');
    this.studentService.deleteGrade(this.student, grade).subscribe(
      () => this.student.grades.splice(this.student.grades.indexOf(grade), 1)
    );
  }

  average() {
    return this.studentService.average(this.student);
  }

  showDetail():boolean {
    this.detailedInfo = !this.detailedInfo;
    return false;
  }

  toggleGradeAdd() {
    this.gradeAdd = !this.gradeAdd;
    return false;
  }

  toggleEdit(grade:Grade) {
    grade.singleGradeEdit = !grade.singleGradeEdit;
  }

  getRole() {
    return this.auth.getRole();
  }

}
