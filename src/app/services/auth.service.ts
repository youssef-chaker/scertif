import {Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class AuthService {

  @Output() loggedIn: BehaviorSubject<boolean> = new BehaviorSubject(undefined);

  constructor(private httpClient: HttpClient) {
  }

  login(usernameoremail, password): Observable<any> {
    return this.httpClient.post<any>('localhost:port/api/users/authenticate',
      {
        usernameoremail,
        password
      });
  }

  register(email, password, username): Observable<any> {
    return this.httpClient.post<any>('localhost:port/api/users/register',
      {
        username,
        password,
        email
      });
  }

  logOut(): void {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
  }

  isConnected(): boolean {
    return !!localStorage.getItem('token');
  }

}
