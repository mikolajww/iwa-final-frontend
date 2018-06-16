import {Grade} from './grade';
import {Input} from '@angular/core';

export class Student {

  name: string;
  surname: string;
  indexNr: number;
  grades: Grade[];

  constructor(name: string, surname: string, indexNr: number) {
    this.name = name;
    this.surname = surname;
    this.indexNr = indexNr;
    this.grades = [ new Grade('IWA',5,3),
      new Grade('Computer architecture', 4, 4)
    ];
  }

  average() {
    let sumGrades:number = 0;
    let sumWeights:number = 0;
    for(let grade of this.grades) {
      sumGrades += grade.grade * grade.weight;
      sumWeights += grade.weight;
    }
    return sumGrades/sumWeights;

  }
}
