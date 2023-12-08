import { AppLayoutComponent } from './layout/app.layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/auth/auth.module').then(
        (m) => m.AuthModule
      )
  },
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
        canActivate: [authGuard],
      },
      {
        path: 'income',
        loadChildren: () =>
          import('./modules/income/income.module').then((m) => m.IncomeModule),
        canActivate: [authGuard],
      },
      {
        path: 'expense',
        loadChildren: () =>
          import('./modules/expense/expense.module').then(
            (m) => m.ExpenseModule
          ),
        canActivate: [authGuard],
      },
      {
        path: 'planning',
        loadChildren: () =>
          import('./modules/planning/planning.module').then(
            (m) => m.PlanningModule
          ),
        canActivate: [authGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
