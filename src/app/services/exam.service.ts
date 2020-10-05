import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable()
export class ExamService {
  constructor(private httpClient: HttpClient) {
  }

  getQuestions(exam): Observable<any> {
    return this.httpClient.get('https://jsonplaceholder.typicode.com/posts');
  }

  getDumpQuestions(): any {
    return [{
      id: 1,
      title: 'Question1',
      body: 'Body1',
      choices: ['Answer1', 'Answer2', 'Answer3', 'Answer4'],
      correctAnswer: ['Answer1'],
      explanation: 'Explanation1'
    },
      {
        id: 2,
        title: 'Question2',
        body: 'Body2',
        choices: ['Answer1', 'Answer2', 'Answer3', 'Answer4'],
        correctAnswer: ['Answer1', 'Answer2'],
        explanation: 'Explanation2'
      },
      {
        id: 3,
        title: 'Question3',
        body: 'Body3',
        choices: ['Answer1', 'Answer2', 'Answer3', 'Answer4'],
        correctAnswer: ['Answer1', 'Answer3'],
        explanation: 'Explanation3'
      },
      {
        id: 4,
        title: 'Question4',
        body: 'Body4',
        choices: ['Answer1', 'Answer2', 'Answer3', 'Answer4'],
        correctAnswer: ['Answer2'],
        explanation: 'Explanation4'
      },
      {
        id: 5,
        title: 'Question5',
        body: 'Body5',
        choices: ['Answer1', 'Answer2', 'Answer3', 'Answer4'],
        correctAnswer: ['Answer2', 'Answer3'],
        explanation: 'Explanation5'
      },
      {
        id: 6,
        title: 'Question6',
        body: 'Body6',
        choices: ['Answer1', 'Answer2', 'Answer3', 'Answer4'],
        correctAnswer: ['Answer1', 'Answer4'],
        explanation: 'Explanation6'
      },
      {
        id: 7,
        title: 'Question7',
        body: 'Body7',
        choices: ['Answer1', 'Answer2', 'Answer3', 'Answer4'],
        correctAnswer: ['Answer1'],
        explanation: 'Explanation7'
      },
      {
        id: 8,
        title: 'Question8',
        body: 'Body8',
        choices: ['Answer1', 'Answer2', 'Answer3', 'Answer4'],
        correctAnswer: ['Answer4'],
        explanation: 'Explanation8'
      },
      {
        id: 9,
        title: 'Question9',
        body: 'Body9',
        choices: ['Answer1', 'Answer2', 'Answer3', 'Answer4'],
        correctAnswer: ['Answer3', 'Answer4'],
        explanation: 'Explanation9'
      },
      {
        id: 10,
        title: 'Question10',
        body: 'Body10',
        choices: ['Answer1', 'Answer2', 'Answer3', 'Answer4'],
        correctAnswer: ['Answer1', 'Answer4'],
        explanation: 'Explanation10'
      },
      {
        id: 11,
        title: 'Question11',
        body: 'Body11',
        choices: ['Answer1', 'Answer2', 'Answer3', 'Answer4'],
        correctAnswer: ['Answer3'],
        explanation: 'Explanation11'
      }];
  }
}
