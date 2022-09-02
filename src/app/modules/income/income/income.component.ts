import { IncomeService } from './../income.service';
import { Income } from './../income';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css'],
})
export class IncomeComponent implements OnInit {
  private id?: number;
  income = new Income();
  editing = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private incomeService: IncomeService
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];

    if (this.id) {
      this.incomeService.findById(this.id).subscribe({
        next: (result) => {
          this.income = result
          this.editing = true;
          console.log(this.income)
        },
        error: (error) => this.onError(error),
      });
    }
  }

  isReceivable(): boolean {
    return this.editing && this.income.status === 'OPEN';
  }

  isCancelable(): boolean {
    return this.editing && this.income.status === 'RECEIVED';
  }

  private onError(error: any) {
    console.error(error);
    alert(JSON.stringify(error));
  }
}
