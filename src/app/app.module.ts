import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {AuthService} from './services/auth.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SignInComponent } from './sign-in/sign-in.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {RequestCacheService} from './services/request-cache.service';
import {CachingInterceptor} from './services/caching-interceptor.service';
import {SharedModule} from './modules/shared.module';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {HttpRequestInterceptor} from './services/http-request-interceptor.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SignUpComponent,
    SignInComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatProgressBarModule,
    NgbModule
  ],
  providers: [
    AuthService,
    RequestCacheService,
    [
      {provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true },
      {provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true }
    ]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
