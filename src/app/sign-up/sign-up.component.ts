import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {HomeComponent} from '../home/home.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {

  userForm: FormGroup;
  incorrectData = false;
  loading = false;
  submitted: boolean;
  differentPassword: boolean;
  usernameExist: boolean;
  emailExist: boolean;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void { this.initForm() }

  get f() { return this.userForm.controls }

  initForm(): void {
    this.userForm = this.formBuilder.group(
      {
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confPassword: ['', Validators.required]
      }
    );
  }

  onSignUp() {
    this.usernameExist = false;
    this.emailExist = false;
    this.differentPassword = false;
    this.submitted = true;
    if (this.userForm.invalid)
      return;
    const formSignUpValue = this.userForm.value;
    const username = formSignUpValue.username;
    const password = formSignUpValue.password;
    const confPassword = formSignUpValue.confPassword;
    if (password != confPassword) {
      this.differentPassword = true;
      return;
    }
    const email = formSignUpValue.email;
    this.loading = true;
    this.authService.register(email, password, username)
      .subscribe(
        res => {
          localStorage.setItem('token', res.token);
          this.authService.loggedIn.next(true);
          this.router.navigate(['']).then();
          this.loading = false;
        },
        error => {
          if (error.error.includes('username_1 dup key'))
            this.usernameExist = true;
          else if (error.error.includes('email_1 dup key'))
            this.emailExist = true;
          this.loading = false;
        }
      );
    this.incorrectData = true;
  }
}
