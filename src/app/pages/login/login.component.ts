import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoginForm } from '../../models/LoginForm';
import { UserService } from '../../services/user.service';
import { LoginResponse } from '../../models/LoginResponse';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: LoginForm;
  lgnSubscription: Subscription;
  @ViewChild('lgnButton') lgnButton: ElementRef;
  constructor(private userService: UserService, private messageService: MessageService, private router: Router) {
    this.loginForm = new LoginForm();
    this.userService.logout();
    this.userService.userLoggedInSubject.subscribe((userLoggedIn: boolean) => {
      if (userLoggedIn) {
        this.messageService.add({ severity: 'success', summary: 'Successfully logged in' });
        this.router.navigate(['/dashboard']);
      } else {
        this.messageService.add({ severity: 'info', summary: 'Wrong Credentials' });
      }
    });
  }

  ngOnInit() {
  }

  login(event: MouseEvent) {
    this.lgnButton.nativeElement.disabled = true;
    try {
      this.userService.login(this.loginForm);
      this.lgnButton.nativeElement.disabled = false;
    } catch (error) {
      this.lgnButton.nativeElement.disabled = false;
      this.lgnSubscription.unsubscribe();
      this.messageService.add({ severity: 'error', summary: error.message });
    }
  }

}
