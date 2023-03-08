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
      error.error.messages.array.forEach((message: any) => {
        console.error(message);
      });
    }
  }
}
