import {Grade} from './grade';

export class Student {

  id:number;
  name: string;
  surname: string;
  indexNr: number;
  grades: Grade[];

  constructor(name: string, surname: string, indexNr: number) {
    this.name = name;
    this.surname = surname;
    this.indexNr = indexNr;
    this.grades = [];
  }

}
