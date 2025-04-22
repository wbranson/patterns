// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { DataSourceGridComponent } from './app/components/data-source-grid.component';

console.log('Bootstrapping app...');


bootstrapApplication(DataSourceGridComponent)
  .catch(err => console.error(err));
