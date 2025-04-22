// src/app/services/data-source.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DataSource } from '../models/data-source.model';

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {
  private mockData: DataSource[] = [
    { id: 1, name: 'Sync Provider A', type: 'data sync provider', enabled: true },
    { id: 2, name: 'Sink B', type: 'data sink', enabled: false },
    { id: 3, name: 'Sync Provider C', type: 'data sync provider', enabled: true },
  ];

  getDataSources(): Observable<DataSource[]> {
    return of(this.mockData);
  }

  updateDataSources(data: DataSource[]): Observable<any> {
    this.mockData = [...data];
    return of({ success: true });
  }
}
