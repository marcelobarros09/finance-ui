import { PlanningListComponent } from './planning-list/planning-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PlanningListComponent
  },
  /*{
    path: 'new',
    component: PlanningComponent
  },
  {
    path: ':id',
    component: PlanningComponent
  }*/
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanningRoutingModule { }
