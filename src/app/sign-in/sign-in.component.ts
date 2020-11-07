import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit, OnDestroy {

  subs = new Subscription();
  loading = false;
  userForm: FormGroup;
  incorrectData = false;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private authService: AuthService) { }

  ngOnInit(): void { this.initForm(); }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  initForm(): void {
    this.userForm = this.formBuilder.group(
      {
        usernameOrEmail: ['', Validators.required],
        password: ['', Validators.required]
      }
    );
  }

  onSignIn(): void {
    this.incorrectData = false;
    this.loading = true;
    const formSignInValue = this.userForm.value;
    const usernameOrEmail = formSignInValue.usernameOrEmail;
    const password = formSignInValue.password;
    this.subs.add(
      this.authService.login(usernameOrEmail, password)
        .subscribe(
          res => {
            if (res.message === 'incorrect password' || res.message === 'user does not exist') {
              this.loading = false;
              this.incorrectData = true;
              return;
            }
            localStorage.setItem('token', res.token);
            this.authService.loggedIn.next(true);
            this.router.navigate(['/exam']).then();
          },
          () => {
            this.incorrectData = true;
            this.loading = false;
          }
        )
    );
  }

}
