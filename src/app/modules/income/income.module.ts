import { TemplateModule } from './../template/template.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { ChipModule } from 'primeng/chip';
import { CalendarModule } from 'primeng/calendar';

import { IncomeRoutingModule } from './income-routing.module';
import { IncomeListComponent } from './income-list/income-list.component';
import { IncomeComponent } from './income/income.component';

@NgModule({
  declarations: [IncomeListComponent, IncomeComponent],
  imports: [
    CommonModule,
    IncomeRoutingModule,
    TemplateModule,
    ToolbarModule,
    ButtonModule,
    PanelModule,
    InputTextModule,
    SelectButtonModule,
    TableModule,
    ChipModule,
    FormsModule,
    HttpClientModule,
    CalendarModule,
  ],
})
export class IncomeModule {}
