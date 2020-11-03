import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'examFilter'
})
export class ExamFilterPipe implements PipeTransform {

  transform(exams: any[], searchExam: string): any[] {
    if (!exams || !searchExam) {
      return [];
    }
    searchExam = searchExam.toLocaleLowerCase();
    return exams.filter(e => {
      return e.toLocaleLowerCase().includes(searchExam);
    });
  }

}
