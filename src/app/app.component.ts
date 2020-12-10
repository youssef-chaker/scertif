import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';
import {ChatSocketService} from './services/chat-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'scertif';

  constructor(private authService: AuthService,
              private chatSocketService: ChatSocketService) {}

  ngOnInit(): void {
    this.chatSocketService.setupSocketConnection();
    this.chatSocketService.setupSocketChannels();
    this.authService.isConnected()
      .subscribe(() => {
          this.authService.loggedIn.next(true);
          this.chatSocketService.getUsers();
          this.chatSocketService.addUser(localStorage.getItem('username'));
        },
        () => this.authService.loggedIn.next(false)
      );
  }

  ngOnDestroy(): void {
    this.chatSocketService.disconnect();
  }

}
