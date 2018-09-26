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

  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  constructor(private httpClient: HttpClient) {
    if (localStorage.getItem('uid')) {
      this.userLoggedIn = true;
    } else {
      this.userLoggedIn = false;
    }
  }

  login(loginForm: LoginForm) {
    this.httpClient.post(this.baseUrl + '/login', loginForm, this.options).subscribe((loginResponse: LoginResponse) => {
      if (loginResponse.success) {
        localStorage.setItem('uid', loginResponse.uid);
        this.userLoggedIn = (true);
      }
    });
  }
  logout() {
    localStorage.removeItem('uid');
    this.userLoggedIn = (false);
  }
}
