import { Injectable } from '@angular/core';
import {Student} from './student';
import {Grade} from './grade';


export enum SortingType {ASC, DESC}
export enum SortingParameter {NAME, SURNAME, INDEX}

@Injectable()
export class StudentService {
  sortingParam:SortingParameter = SortingParameter.NAME
  sortingType:SortingType = SortingType.ASC;
  private MockStudents = [
    new Student('Jan','Kowalski',1),
    new Student('Radek','Nowicki',2),
    new Student('Mario','Luigi',3),
    new Student('Wario','Waluigi',4),
  ];
  private filter:string = "";
  constructor() { }

  sortStudents() {
    this.MockStudents.sort((s1,s2) => {
      if(this.sortingParam == SortingParameter.NAME) {
        if(this.sortingType == SortingType.DESC) {
          if(s1.name < s2.name) return 1;
          else if (s1.name > s2.name) return -1;
          else return 0;
        }
        else {
          if(s1.name > s2.name) return 1;
          else if (s1.name < s2.name) return -1;
          else return 0;
        }
      }
      else if(this.sortingParam == SortingParameter.SURNAME) {
        if(this.sortingType == SortingType.DESC) {
          if(s1.surname < s2.surname) return 1;
          else if (s1.surname > s2.surname) return -1;
          else return 0;
        }
        else {
          if(s1.surname > s2.surname) return 1;
          else if (s1.surname < s2.surname) return -1;
          else return 0;
        }
      }
      else {
        if(this.sortingType == SortingType.DESC) {
          if(s1.indexNr < s2.indexNr) return 1;
          else if (s1.indexNr > s2.indexNr) return -1;
          else return 0;
        }
        else {
          if(s1.indexNr > s2.indexNr) return 1;
          else if (s1.indexNr < s2.indexNr) return -1;
          else return 0;
        }
      }
    })
  }

  getStudents() : Student[] {
    return this.MockStudents;
  }

  addStudent(student:Student):void {
    for(let s of this.MockStudents) {
      if(student.indexNr == s.indexNr) {
        alert("Can't input two students with the same ID");
        return;
      }
    }
    this.MockStudents.push(student);
  }

  deleteStudent(student:Student):void {
    this.MockStudents.splice(this.MockStudents.indexOf(student),1);
  }

  deleteGrade(student:Student, grade:Grade) {
    student.grades.splice(student.grades.indexOf(grade), 1);
  }

  addGradeForStudent(student:Student, grade:Grade):void {
    student.grades.push(grade);
  }

  editGradeForStudent(student:Student, gradeIdx:number, subject:string, grade:number, weight:number) {
    student.grades[gradeIdx].subject = subject;
    student.grades[gradeIdx].grade = grade;
    student.grades[gradeIdx].weight = weight;
  }

  setFilter(filter:string) {
    this.filter = filter;
  }
  resetFilter() {
    this.filter = "";
  }
  getFilter():string {
    return this.filter;
  }
}
