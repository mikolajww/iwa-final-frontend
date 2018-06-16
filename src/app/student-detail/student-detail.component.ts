import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Student} from '../student';
import {StudentService} from '../student.service';
import {Grade} from '../grade';
declare var jQuery:any;

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})

export class StudentDetailComponent implements OnInit, OnDestroy {
  @Input() student:Student;
  detailedInfo:boolean;
  gradeEdit:boolean;

  constructor(private studentService:StudentService) {
    this.detailedInfo = false;
  }

  ngOnInit() {
    console.log('Created ' + this.student.name)
  }

  ngOnDestroy() {
    console.log('Destroyed ' + this.student.name);
  }

  addGrade(subject:HTMLInputElement, grade:HTMLInputElement, weight:HTMLInputElement):boolean{
    if(subject.value != "" && grade.value != "" && weight.value != "") {
      this.studentService.addGradeForStudent(this.student,new Grade(subject.value, parseFloat(grade.value), parseInt(weight.value)));
    }
    return false;
  }

  editGrade(subject:HTMLInputElement, grade:HTMLInputElement, weight:HTMLInputElement, i:number):boolean {
    if(subject.value != "" && grade.value != "" && weight.value != "") {
      this.studentService.editGradeForStudent(this.student, i, subject.value, parseFloat(grade.value), parseInt(weight.value));
    }
    return false;
  }

  deleteStudent():void {
    jQuery('.ui.basic.modal').modal({
      onHide: function(){
        console.log('hidden');

      },
      onShow: function(){
        console.log('shown');
      },
      onApprove: () => {
        console.log('Approve');
        return this.studentService.deleteStudent(this.student);
      }
    }).modal('show');
  }

  deleteGrade(grade:Grade):void {
    this.studentService.deleteGrade(this.student, grade);
  }

  average() {
    return this.student.average();
  }

  showDetail():boolean {
    this.detailedInfo = !this.detailedInfo;
    return false;
  }

  editGrades() {
    this.gradeEdit = !this.gradeEdit;
    return false;
  }

}
