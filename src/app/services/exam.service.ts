import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';

@Injectable()
export class ExamService {
  constructor(private httpClient: HttpClient) {
  }

  getQuestions(exam): Observable<any> {
    return this.httpClient.get<any>('https://localhost:5001/api/exams/' + exam)
      .pipe(
        map(ex => {
          const questions = ex.Questions ? ex.Questions : ex.questions;
          questions.forEach(q => {
            if (q.Id) {
              q.id = q.Id;
              q.question = q.Question;
            }
            q.explanation = 'Explanation';
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

  reportQuestion(id, exam, question, user, message): Observable<any> {
    return this.httpClient.post('https://localhost:5001/api/exams/report', {
      id,
      exam,
      question,
      user,
      message
    });
  }

  getSearchedExams(exam): Observable<any[]> {
    return this.httpClient.get<any[]>('https://localhost:5001/api/exams/search/' + exam);
  }

  getSimilarExams(exam): Observable<any[]> {
    return this.httpClient.get<any[]>('http://127.0.0.1:5005/api/similarExams/' + exam);
  }
}
