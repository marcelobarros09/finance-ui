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
      error.error.messages.forEach((message: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: message,
        });
      });
    } else {
      console.error('An error occurred', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'An error occurred. Try again later.',
      });
    }
  }
}
