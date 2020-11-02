import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  loading = false;
  userForm: FormGroup;
  incorrectData = false;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private authService: AuthService) { }

  ngOnInit(): void { this.initForm(); }

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
    /* this.authService.login(usernameOrEmail, password)
      .subscribe(
        res => {
          localStorage.setItem('token', res.token);
          this.authService.loggedIn.next(true);
          this.loading = false;
          this.router.navigate(['']).then();
        },
        () => {
          this.incorrectData = true;
          this.loading = false;
        }
      ); */
  }


}
