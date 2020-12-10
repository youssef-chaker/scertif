import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {ChatSocketService} from '../services/chat-socket.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  subs = new Subscription();
  connected;
  loading;
  searchText;
  constructor(private authService: AuthService,
              private router: Router,
              private chatSocketService: ChatSocketService) {
  }

  ngOnInit(): void {
    this.subs.add(
      this.authService.loggedIn
        .subscribe(c => this.connected = c)
    );
    this.subs.add(
      this.authService.loading
        .subscribe(l => this.loading = l)
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onLogout(): void {
    this.authService.logOut();
    this.chatSocketService.logOut();
    this.router.navigate(['/sign-in']).then();
  }

  onExams(): void {
    if (this.router.url !== '/exam') {
      this.authService.loading.next(!this.loading);
      setTimeout(() => {
        this.router.navigate(['/exam']).then();
      }, 500);
    }
  }

  unAuth(): boolean {
    return !this.connected && this.connected !== undefined;
  }

  onSearch(): void {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigateByUrl('/exam/search/' + this.searchText).then()
    );
  }

  validSearch(): boolean {
    return !(this.searchText === undefined || this.searchText.length === 0);
  }

  onKeyPress($event: KeyboardEvent): void {
    if ($event.key === 'Enter' && this.validSearch()) {
      this.onSearch();
    }
  }
}
