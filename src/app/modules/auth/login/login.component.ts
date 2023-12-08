import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = "";
  password: string = "";

  constructor(private authService: AuthService, private messageService: MessageService) { }

  login(): void {
    if(this.authService.login(this.username, this.password)) {
      window.location.href = '/';
    } else {
      this.messageService.add({severity:'error', summary:'Error', detail:'Invalid credentials'});
    }
  }
}
