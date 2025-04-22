// src/app/models/data-source.model.ts
export interface DataSource {
    id: number;
    name: string;
    type: 'data sync provider' | 'data sink';
    enabled: boolean;
  }
  