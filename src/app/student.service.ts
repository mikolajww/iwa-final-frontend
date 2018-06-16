import { Injectable } from '@angular/core';
import {Student} from './student';
import {Grade} from './grade';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {tap} from "rxjs/operators";


export enum SortingType {ASC, DESC}
export enum SortingParameter {NAME, SURNAME, INDEX}

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class StudentService {
  sortingParam:SortingParameter = SortingParameter.NAME;
  sortingType:SortingType = SortingType.ASC;

  private apiUrl: string = 'http://localhost:8080/api/students';
  private avatarUrl: string = 'https://jsonplaceholder.typicode.com/photos';

  private filter:string = "";
  constructor(private http:HttpClient) {
    console.log('service instance created')
  }

  sortStudents(students:Student[]):Student[] {
    return students.sort((s1,s2) => {
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

  getAvatar(student:Student) {
    return this.http.get<any>(`${this.avatarUrl}/${student.id}`);
  }

  getStudents() : Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl).pipe(
      tap((s) => {console.log(s)})
    );
  }

  addStudent(student:Student):Observable<Student>{
    console.log('added from service');
    return this.http.post<Student>(this.apiUrl, student, httpOptions)
  };

  deleteStudent(student:Student):Observable<Student>{
    const url = `${this.apiUrl}/${student.id}`;
    return this.http.delete<Student>(url, httpOptions);
  }

  updateStudent(student:Student):Observable<Student>{
    const url = `${this.apiUrl}/${student.id}`;
    return this.http.put<Student>(url, student, httpOptions);
  }


  deleteGrade(student:Student, grade:Grade):Observable<Grade> {
    const gradeId = grade.id;
    const url = `${this.apiUrl}/${student.id}/grades/${gradeId}`;
    console.log(url);
    return this.http.delete<Grade>(url, httpOptions);
  }

  addGradeForStudent(student:Student, grade:Grade):Observable<Grade> {
    const url = `${this.apiUrl}/${student.id}/grades`;
    return this.http.post<Grade>(url, grade, httpOptions);
  }

  editGradeForStudent(student:Student, gradeIdx:number, grade:Grade):Observable<Grade> {
    const gradeId = student.grades[gradeIdx].id;
    const url = `${this.apiUrl}/${student.id}/grades/${gradeId}`;
    return this.http.put<Grade>(url, grade, httpOptions);
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
  average(student:Student):number {
    let sumGrades:number = 0;
    let sumWeights:number = 0;
    for(let grade of student.grades) {
      sumGrades += grade.grade * grade.weight;
      sumWeights += grade.weight;
    }
    return sumGrades/sumWeights;
  }

}
