import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface CategoryResponse {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl = `${environment.apiUrl}/v1/categories`;
  constructor(protected http: HttpClient) {}

  findByType(type: String): Observable<CategoryResponse[]> {
    return this.http.get<CategoryResponse[]>(this.baseUrl + '/type/' + type);
  }
}
