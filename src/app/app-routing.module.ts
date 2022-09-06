import { AppLayoutComponent } from './layout/app.layout.component';
import { AuthGuard } from './app.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'income',
        loadChildren: () =>
          import('./modules/income/income.module').then((m) => m.IncomeModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'expense',
        loadChildren: () =>
          import('./modules/expense/expense.module').then(
            (m) => m.ExpenseModule
          ),
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
