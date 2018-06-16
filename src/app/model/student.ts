import {Grade} from './grade';

export class Student {

  id:number;
  name: string;
  surname: string;
  indexNr: number;
  grades: Grade[];
  thumbnailUrl: string;

  constructor(name: string, surname: string, indexNr: number, thumbnailUrl?:string) {
    this.name = name;
    this.surname = surname;
    this.indexNr = indexNr;
    this.grades = [];
    this.thumbnailUrl = thumbnailUrl;
  }

}
