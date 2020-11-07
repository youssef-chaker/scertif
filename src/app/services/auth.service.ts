import {Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {shareReplay} from 'rxjs/operators';

@Injectable()
export class AuthService {

  @Output() loggedIn: BehaviorSubject<boolean> = new BehaviorSubject(undefined);
  @Output() loading: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private httpClient: HttpClient) {
  }

  login(usernameoremail, password): Observable<any> {
    return this.httpClient.post<any>('https://localhost:5001/api/users/authenticate',
      {
        usernameoremail,
        password
      })
      .pipe(
        shareReplay()
    );
  }

  register(email, password, username): Observable<any> {
    return this.httpClient.post<any>('https://localhost:5001/api/users/register',
      {
        username,
        password,
        email
      })
      .pipe(
      shareReplay()
    );
  }

  logOut(): void {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
  }

  isConnected(): Observable<any> {
    return this.httpClient.get('https://localhost:5001/api/users/validate');
  }

}
