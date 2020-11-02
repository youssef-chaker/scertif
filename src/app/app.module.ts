import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { ExamModule } from './modules/exam.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {AuthService} from './services/auth.service';
import {ReactiveFormsModule} from '@angular/forms';
import { SignInComponent } from './sign-in/sign-in.component';
import { LoadingComponent } from './loading/loading.component';
import { ExamsComponent } from './exams/exams.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SingleExamComponent } from './single-exam/single-exam.component';
import {RequestCacheService} from './services/request-cache.service';
import {CachingInterceptor} from './services/caching-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SignUpComponent,
    SignInComponent,
    LoadingComponent,
    ExamsComponent,
    NotFoundComponent,
    SingleExamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ExamModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    RequestCacheService,
    [
      {provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true }
    ]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
