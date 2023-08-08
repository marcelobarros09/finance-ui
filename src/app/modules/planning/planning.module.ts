import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { SharedModule } from './../shared/shared.module';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { HttpClientModule } from '@angular/common/http';
import { ChipModule } from 'primeng/chip';
import { TableModule } from 'primeng/table';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TemplateModule } from './../template/template.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';

import { PlanningRoutingModule } from './planning-routing.module';
import { PlanningListComponent } from './planning-list/planning-list.component';
import { PlanningComponent } from './planning/planning.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PlanningListComponent, PlanningComponent],
  imports: [
    CommonModule,
    PlanningRoutingModule,
    TemplateModule,
    ToolbarModule,
    ButtonModule,
    PanelModule,
    InputTextModule,
    SelectButtonModule,
    TableModule,
    ChipModule,
    HttpClientModule,
    CalendarModule,
    InputNumberModule,
    SharedModule,
    ConfirmPopupModule,
    TooltipModule,
    TagModule,
    InputSwitchModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class PlanningModule {}
