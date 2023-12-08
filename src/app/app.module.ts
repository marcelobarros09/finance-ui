import { FormBuilder } from '@angular/forms';
import { environment } from './../environments/environment';
import { MessageService, ConfirmationService } from 'primeng/api';
import { AppLayoutModule } from './layout/app.layout.module';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  APP_INITIALIZER,
  DEFAULT_CURRENCY_CODE,
  LOCALE_ID,
  NgModule,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import localePt from '@angular/common/locales/pt';
import { ToastModule } from 'primeng/toast';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateModule } from './modules/template/template.module';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppLayoutModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TemplateModule,
    HttpClientModule,
    CommonModule,
    ToastModule,
  ],
  providers: [
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    DatePipe,
    MessageService,
    ConfirmationService,
    FormBuilder,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
