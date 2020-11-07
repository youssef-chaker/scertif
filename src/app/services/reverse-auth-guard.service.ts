import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable()
export class ReverseAuthGuardService implements CanActivate {
  constructor(private router: Router,
              private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const connected = this.authService.loggedIn.getValue();
    if (connected !== undefined) {
      if (connected) {
        this.router.navigate(['']).then();
        return false;
      }
      return true;
    }
    return new Observable<boolean>(loggedIn => {
      this.authService.isConnected()
        .subscribe(() => this.router.navigate([''])
            .then(() => loggedIn.next(false)),
          () => {
            loggedIn.next(true);
          });
    });
  }
}
