import { Observable } from 'rxjs';
import { Planning } from './planning';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pageable } from './../core/pageable';
import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

export interface PlanningFilter extends Pageable {
  description?: string;
  dueDay?: number;
  type?: string[];
  active?: boolean;
  startAtStart?: Date;
  startAtEnd?: Date;
  endAtStart?: Date;
  endAtEnd?: Date;
}

export interface PlanningListResponse {
  content: Planning[];
  pageable: any;
  totalPages: number;
  totalElements: number;
  size: 20;
}

export class PlanningRequest {
  id?: number;
  description?: string;
  amount?: number;
  dueDay?: number;
  type?: string;
  active?: boolean;
  startAt?: string;
  endAt?: string;
}

@Injectable({
  providedIn: 'root',
})
export class PlanningService {
  private baseUrl = `${environment.apiUrl}/v1/plannings`;
  private monthAndYearFormat = 'yyyy-MM';

  constructor(protected http: HttpClient, private datePipe: DatePipe) {}

  findByFilter(filter: PlanningFilter): Observable<PlanningListResponse> {
    let params = new HttpParams()
      .set('page', filter.page!)
      .set('size', filter.size!)
      .set('sort', 'description,asc')
      .set('active', filter.active!);

    if (filter.description) {
      params = params.set('description', filter.description);
    }

    if (filter.type && filter.type.length === 1) {
      params = params.set('type', filter.type[0]);
    }

    if (filter.startAtStart) {
      params = params.set(
        'startAtStart',
        this.datePipe.transform(filter.startAtStart, this.monthAndYearFormat)!
      );
    }

    if (filter.startAtEnd) {
      params = params.set(
        'startAtEnd',
        this.datePipe.transform(filter.startAtEnd, this.monthAndYearFormat)!
      );
    }

    if (filter.endAtStart) {
      params = params.set(
        'endAtStart',
        this.datePipe.transform(filter.endAtStart, this.monthAndYearFormat)!
      );
    }

    if (filter.endAtEnd) {
      params = params.set(
        'endAtEnd',
        this.datePipe.transform(filter.endAtEnd, this.monthAndYearFormat)!
      );
    }

    if (filter.dueDay) {
      params = params.set('dueDay', filter.dueDay);
    }

    return this.http.get<PlanningListResponse>(this.baseUrl, {
      params: params,
    });
  }

  findById(id: number): Observable<Planning> {
    return this.http.get<Planning>(`${this.baseUrl}/${id}`);
  }

  create(planning: Planning): Observable<Planning> {
    return this.http.post<Planning>(
      `${this.baseUrl}`,
      this.toRequest(planning)
    );
  }

  update(id: number, planning: Planning): Observable<Planning> {
    return this.http.put<Planning>(
      `${this.baseUrl}/${id}`,
      this.toRequest(planning)
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  activate(id: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}/active`, {});
  }

  inactivate(id: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}/inactive`, {});
  }

  private toRequest(planning: Planning): PlanningRequest {
    let request = new PlanningRequest();
    request.active = planning.active;
    request.amount = planning.amount;
    request.description = planning.description;
    request.dueDay = planning.dueDay;
    request.type = planning.type;
    request.startAt = this.datePipe.transform(
      planning.startAt,
      this.monthAndYearFormat
    )!;
    request.endAt = this.datePipe.transform(
      planning.endAt,
      this.monthAndYearFormat
    )!;
    return request;
  }
}
