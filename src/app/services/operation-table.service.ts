import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { fromEntries } from '../utils/from-entries';
import { environment } from './../../environments/environment';

@Injectable({ providedIn: 'root' })
export class OperationTableService {

  constructor(private httpClient: HttpClient) { }

  loadOperationTable(columns: string[], filters: [string, any][] = []): Observable<[]> {
    return this.httpClient.get<[]>(`${environment.apiUrl}/tables/op?`, {
      params: {
        columns: columns.join(','),
        ...fromEntries(filters)
      }
    });
  }

}
