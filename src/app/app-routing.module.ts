import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {ReverseAuthGuardService} from './services/reverse-auth-guard.service';

const routes: Routes = [
  { path: 'exam', loadChildren: () => import('./modules/exam.module').then(m => m.ExamModule) },
  { path: 'sign-up', component: SignUpComponent, canActivate: [ReverseAuthGuardService] },
  { path: 'sign-in', component: SignInComponent, canActivate: [ReverseAuthGuardService] },
  { path: '', component: HomeComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  providers: [ReverseAuthGuardService],
  exports: [RouterModule]
})
export class AppRoutingModule { }
