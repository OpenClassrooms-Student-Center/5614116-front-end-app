import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth$ = new BehaviorSubject<boolean>(false);
  token: string = null;
  userId: string = 'temp user';

  constructor(private router: Router) {}

  createNewUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      setTimeout(
        () => {
          this.isAuth$.next(true);
          resolve();
        }, 2000
      );
    });
  }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      setTimeout(
        () => {
          this.isAuth$.next(true);
          resolve();
        }, 2000
      );
    });
  }

  logout() {
    return new Promise((resolve, reject) => {
      setTimeout(
        () => {
          this.isAuth$.next(false);
          this.userId = null;
          this.token = null;
          resolve();
        }, 300
      );
    });
  }
}
