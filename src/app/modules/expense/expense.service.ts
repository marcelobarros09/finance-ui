import { environment } from '../../../environments/environment';
import { Expense } from './expense';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pageable } from '../core/pageable';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

export interface ExpenseFilter extends Pageable {
  description?: string;
  status?: string[];
  dateDueStart?: Date;
  dateDueEnd?: Date;
  datePaymentStart?: Date;
  datePaymentEnd?: Date;
}

export interface ExpenseListResponse {
  content: Expense[];
  pageable: any;
  totalPages: number;
  totalElements: number;
  size: 20;
}

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private baseUrl = `${environment.apiUrl}/v1/expenses`;
  private dateFormat = 'yyyy-MM-dd';

  constructor(protected http: HttpClient, private datePipe: DatePipe) {}

  findByFilter(filter: ExpenseFilter): Observable<ExpenseListResponse> {
    let params = new HttpParams()
      .set('page', filter.page!)
      .set('size', filter.size!)
      .set('sort', 'description,asc')

    if (filter.description) {
      params = params.set('description', filter.description);
    }

    if (filter.dateDueStart) {
      params = params.set(
        'dateDueStart',
        this.datePipe.transform(filter.dateDueStart, this.dateFormat)!
      );
    }

    if (filter.dateDueEnd) {
      params = params.set(
        'dateDueEnd',
        this.datePipe.transform(filter.dateDueEnd, this.dateFormat)!
      );
    }

    if (filter.status && filter.status.length === 1) {
      params = params.set('status', filter.status[0]);
    }

    return this.http.get<ExpenseListResponse>(this.baseUrl, {
      params: params,
    });
  }

  findById(id: number): Observable<Expense> {
    return this.http.get<Expense>(`${this.baseUrl}/${id}`);
  }

  create(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(`${this.baseUrl}`, expense);
  }

  update(id: number, expense: Expense): Observable<Expense> {
    return this.http.put<Expense>(`${this.baseUrl}/${id}`, expense);
  }

  pay(id: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}/payment`, {});
  }

  cancelPayment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}/payment`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
