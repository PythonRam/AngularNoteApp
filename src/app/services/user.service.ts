import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { LoginForm } from '../models/LoginForm';
import { LoginResponse } from '../models/LoginResponse';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3000';
  public userLoggedIn: boolean;
  public userLoggedInSubject: ReplaySubject<boolean> = new ReplaySubject();

  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  constructor(private httpClient: HttpClient) {
    if (localStorage.getItem('uid')) {
      this.userLoggedIn = true;
      this.userLoggedInSubject.next(this.userLoggedIn);

    } else {
      this.userLoggedIn = false;
      this.userLoggedInSubject.next(this.userLoggedIn);
    }
  }

  login(loginForm: LoginForm): ReplaySubject<boolean> {
    this.httpClient.post(this.baseUrl + '/login', loginForm, this.options).subscribe((loginResponse: LoginResponse) => {
      if (loginResponse.success) {
        localStorage.setItem('uid', loginResponse.uid);
        this.userLoggedIn = (true);
        this.userLoggedInSubject.next(this.userLoggedIn);
      } else {
        this.userLoggedIn = false;
        this.userLoggedInSubject.next(this.userLoggedIn);
      }
    });
    return this.userLoggedInSubject;
  }
  logout() {
    localStorage.removeItem('uid');
    this.userLoggedIn = (false);
    this.userLoggedInSubject.next(this.userLoggedIn);
  }
}
