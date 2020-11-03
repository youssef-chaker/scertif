import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  subs = new Subscription();
  connected;
  loading;
  constructor(private authService: AuthService,
              private router: Router) {
    this.subs.add(
      this.authService.loggedIn
        .subscribe(c => this.connected = c)
    );
    this.subs.add(
      this.authService.loading
        .subscribe(l => {
          this.loading = l;
        })
    );
    this.authService.loggedIn.next(!!this.authService.isConnected());
  }

  ngOnInit(): void {
  }

  onLogout(): void {
    this.authService.logOut();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onCertification(): void {
    if (this.router.url !== '/exam') {
      this.authService.loading.next(!this.loading);
      setTimeout(() => {
        this.router.navigate(['/exam']).then();
      }, 500);
    }
  }
}
