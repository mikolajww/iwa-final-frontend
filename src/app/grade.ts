export class Grade {
  subject:string;
  grade:number;
  weight:number;
  singleGradeEdit:boolean;

  constructor(subject: string, grade: number, weight: number) {
    this.subject = subject;
    this.grade = grade;
    this.weight = weight;
    this.singleGradeEdit = false;
  }

  toggleEdit():boolean {
    this.singleGradeEdit = !this.singleGradeEdit;
    return false;
  }
}

