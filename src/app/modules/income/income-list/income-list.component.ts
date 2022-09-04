import { LazyLoadEvent } from 'primeng/api';
import {
  IncomeFilter,
  IncomeService,
} from './../income.service';
import { Income } from './../income';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-income-list',
  templateUrl: './income-list.component.html',
  styleUrls: ['./income-list.component.css'],
})
export class IncomeListComponent implements OnInit {
  statusOptions = [
    { label: 'OPEN', value: 'OPEN' },
    { label: 'RECEIVED', value: 'RECEIVED' },
  ];
  incomes: Income[] = [];
  filter: IncomeFilter = {};
  totalRecords: number = 0;
  loading: boolean = false;

  constructor(private incomeService: IncomeService) {}

  ngOnInit(): void {
    this.loading = true;
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth();

    this.filter.dateDueStart = new Date(year, month, 1);
    this.filter.dateDueEnd = new Date(year, month + 1, 0);

  }

  findByFilter(page: number = 0, size: number = 10) {
    this.filter.page = page;
    this.filter.size = size;
    this.loading = true;
    this.incomeService.findByFilter(this.filter).subscribe(
      (result) => {
        this.incomes = result.content
        this.totalRecords = result.totalElements
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        console.log(error);
        alert(JSON.stringify(error));
      }
    );
  }

  onLazyLoad(event: LazyLoadEvent) {
    const page = event!.first! / event!.rows!;
    const size = event.rows;
    this.findByFilter(page, size);
  }

  cleanFilters() {
    this.filter = {};
  }
}
