import { environment } from './../../../environments/environment';
import { Income } from './income';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Pageable } from '../core/pageable';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

export interface IncomeFilter extends Pageable {
  description?: string;
  status?: string;
  dateDueStart?: Date;
  dateDueEnd?: Date;
  dateReceiptStart?: Date;
  dateReceiptEnd?: Date;
}

export interface IncomeResponse {
  content: Income[];
  pageable: any;
  totalPages: number;
  totalElements: number;
  size: 20;
}

@Injectable({
  providedIn: 'root',
})
export class IncomeService {
  baseUrl = `${environment.apiUrl}/v1/incomes`;
  dateFormat = 'yyyy-MM-dd';

  headers = new HttpHeaders().append(
    'Authorization',
    'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJyZ1R0eDlFN2p3Vmp0ZW9CNXhrVDdEaDIzOFlsbHA3VFBuME4ta243cU1JIn0.eyJleHAiOjE2NjA3Nzk1MjIsImlhdCI6MTY2MDc3NTkyMiwiYXV0aF90aW1lIjoxNjYwNzc1OTIxLCJqdGkiOiJkOWJjOTgwOC1hNGQxLTQ3YzEtODM0Yi1jNmFiOTc3ZDNiNjUiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODEvcmVhbG1zL0ZpbmFuY2UiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiZTM3YjQ3MzQtOTZhZi00ZmI4LWI3NGQtNGY3YzUzYjlmZGRiIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiZmluYW5jZS11aSIsInNlc3Npb25fc3RhdGUiOiI2ZWFmYmM5ZS00ZmRhLTQ3NWQtYTViYy1hYTQzZTg5NTk5ODUiLCJhY3IiOiIxIiwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJkZWZhdWx0LXJvbGVzLWZpbmFuY2UiXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJzaWQiOiI2ZWFmYmM5ZS00ZmRhLTQ3NWQtYTViYy1hYTQzZTg5NTk5ODUiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1hcmNlbG8gQmFycm9zIGRhIFNpbHZhIiwicHJlZmVycmVkX3VzZXJuYW1lIjoibWFyY2Vsb2JhcnJvcy1zbXNAaG90bWFpbC5jb20iLCJnaXZlbl9uYW1lIjoiTWFyY2VsbyIsImZhbWlseV9uYW1lIjoiQmFycm9zIGRhIFNpbHZhIiwiZW1haWwiOiJtYXJjZWxvYmFycm9zLXNtc0Bob3RtYWlsLmNvbSJ9.AH6ZFIn11-_tYlJzwYnoxzsHvPIpvizfnSdOVI86NT_x3Jpl1ugtbMDd3ShBiVJAPYIY9B3Mq0dNHcPwCK94aBZUYVPsrKC0OfnaBVeTJIPpIx_VbleT-4lKW6awVAK0PfKPBJdSm7h5vT-jsWkGm0sj0Em4yNYz-E3rNs4WfkGi6AhhUve_l5cnuekfciGNDp76Y9yhHK2xSxwQ8rwVoJY8XkXIPNUBRqKzyBVsGj1wT3KoblLDo-E7g-dLFKL4ToErkrciSSfYIKe4BXa1T3fED_zaKS2NyyB0S6m59_oVCAwtU9R5E0aX6gBu4NBhFNeOuWJtm5LFRE9XBSCMSg'
  );

  constructor(protected http: HttpClient, private datePipe: DatePipe) {}

  findByFilter(filter: IncomeFilter): Observable<IncomeResponse> {
    let params = new HttpParams()
      .set('page', filter.page!)
      .set('size', filter.size!);

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

    if(filter.status) {
      params = params.set('status', filter.status);
    }

    return this.http.get<IncomeResponse>(this.baseUrl, {
      headers: this.headers,
      params: params,
    });
  }
}
