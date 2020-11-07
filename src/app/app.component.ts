import { Component } from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'scertif';

  constructor(private authService: AuthService) {
    this.authService.isConnected()
      .subscribe(() => this.authService.loggedIn.next(true),
        () => this.authService.loggedIn.next(false)
      );
  }

}
