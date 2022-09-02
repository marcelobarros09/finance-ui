import { IncomeComponent } from './income/income.component';
import { IncomeListComponent } from './income-list/income-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: IncomeListComponent
  },
  {
    path: 'new',
    component: IncomeComponent
  },
  {
    path: ':id',
    component: IncomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncomeRoutingModule { }
