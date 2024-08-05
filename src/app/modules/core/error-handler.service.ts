import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(private messageService: MessageService) {}

  handle(error: any) {
    if (error instanceof HttpErrorResponse) {
      if (error.status == 401 || error.status == 403) {
        window.localStorage.clear();
        window.location.href = '/';
      }

      error.error.messages.forEach((message: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: message,
          life: 5000,
        });
      });
    } else {
      console.error('An error occurred', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'An error occurred. Try again later.',
        life: 5000,
      });
    }
  }
}
