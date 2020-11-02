import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  connected;
  constructor(private authService: AuthService) {
    this.authService.loggedIn.subscribe(c => this.connected = c);
    this.authService.loggedIn.next(!!this.authService.isConnected());
  }

  ngOnInit(): void {
  }

  onLogout(): void {
    this.authService.logOut();
  }

}
