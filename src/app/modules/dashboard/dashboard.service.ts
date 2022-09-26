import { Balance } from './balance';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { PeriodOverview } from './dashboard/PeriodOverview';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private baseUrl = `${environment.apiUrl}/v1/statistics`;

  constructor(protected http: HttpClient) {}

  getPeriodOverview(start: string, end: string): Observable<PeriodOverview> {
    let params = new HttpParams().set('start', start).set('end', end);

    return this.http.get<PeriodOverview>(`${this.baseUrl}/period-overview`, {
      params: params,
    });
  }

  getBalance(month: string): Observable<Balance> {
    let params = new HttpParams().set('month', month);
    return this.http.get<Balance>(`${this.baseUrl}/balance`, {
      params: params,
    });
  }
}
