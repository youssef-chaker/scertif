import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Exam} from '../models/exam.model';
import {map, shareReplay} from 'rxjs/operators';


@Injectable()
export class ExamService {
  constructor(private httpClient: HttpClient) {
  }

  getQuestions(exam): Observable<any> {
    return this.httpClient.get<any>('https://localhost:5001/api/exams/' + exam)
      .pipe(
        map(ex => {
          const questions = ex.questions;
          let id = 0;
          questions.forEach(q => {
            q.id = ++id;
            q.explanation = 'Explanation' + id;
          });
          return questions;
        }),
        shareReplay()
      );
  }

  getAllExams(): Observable<any[]> {
    return this.httpClient.get<any[]>('https://localhost:5001/api/exams')
      .pipe(
        shareReplay()
      );
  }
}