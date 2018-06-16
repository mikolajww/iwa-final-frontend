export class Grade {
  subject:string;
  grade:number;
  weight:number
  id:number;
  singleGradeEdit:boolean;

  constructor(subject: string, grade: number, weight: number) {
    this.subject = subject;
    this.grade = grade;
    this.weight = weight;
    this.singleGradeEdit = false;
  }
}
