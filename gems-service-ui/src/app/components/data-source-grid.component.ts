// src/app/components/data-source-grid.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataSourceService } from '../services/data-source.service';
import { DataSource } from '../models/data-source.model';

@Component({
  selector: 'app-data-source-grid',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './data-source-grid.component.html',
  styleUrls: ['./data-source-grid.component.scss']
})
export class DataSourceGridComponent implements OnInit {
  allDataSources: DataSource[] = [];
  filteredDataSources: DataSource[] = [];

  sortAscending = true;
  typeFilter: string = 'all';
  typeSortAscending = true;
  activeSortColumn: 'name' | 'type' | null = null;

  constructor(private service: DataSourceService) {}

  ngOnInit(): void {
    this.service.getDataSources().subscribe(data => {
      this.allDataSources = data;
      this.applyFiltersAndSorting();
    });
  }

  toggleEnabled(item: DataSource): void {
    item.enabled = !item.enabled;
    this.service.updateDataSources(this.allDataSources).subscribe();
  }

  sortByName(): void {
    if (this.activeSortColumn === 'name') {
      this.sortAscending = !this.sortAscending;
    } else {
      this.sortAscending = true; // reset to ascending
      this.activeSortColumn = 'name';
    }
  
    const filtered = this.filteredWithoutSort();
  
    filtered.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) return this.sortAscending ? -1 : 1;
      if (nameA > nameB) return this.sortAscending ? 1 : -1;
      return 0;
    });
  
    this.filteredDataSources = filtered;
  }

  onFilterChange(): void {
    this.applyFiltersAndSorting();
  }

  private applyFiltersAndSorting(): void {
    const filtered = this.filteredWithoutSort();
    this.filteredDataSources = filtered;
  }

  setTypeFilter(type: string): void {
    this.typeFilter = type;
    this.applyFiltersAndSorting();
  }
  
  private filteredWithoutSort(): DataSource[] {
    return this.typeFilter === 'all'
      ? [...this.allDataSources]
      : this.allDataSources.filter(ds => ds.type === this.typeFilter);
  }

  sortByType(): void {
    if (this.activeSortColumn === 'type') {
      this.typeSortAscending = !this.typeSortAscending;
    } else {
      this.typeSortAscending = true;
      this.activeSortColumn = 'type';
    }
  
    const filtered = this.filteredWithoutSort();
  
    filtered.sort((a, b) => {
      const typeA = a.type.toLowerCase();
      const typeB = b.type.toLowerCase();
      if (typeA < typeB) return this.typeSortAscending ? -1 : 1;
      if (typeA > typeB) return this.typeSortAscending ? 1 : -1;
      return 0;
    });
  
    this.filteredDataSources = filtered;
  }

  
  
}

