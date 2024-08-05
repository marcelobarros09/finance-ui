import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanningService } from './../planning.service';
import { Component, OnInit } from '@angular/core';
import { Planning } from '../planning';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorHandlerService } from '../../core/error-handler.service';
import {
  CategoryResponse,
  CategoryService,
} from '../../category/category.service';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css'],
})
export class PlanningComponent implements OnInit {
  typeOptions = [
    { label: 'INCOME', value: 'INCOME' },
    { label: 'EXPENSE', value: 'EXPENSE' },
  ];
  planningForm!: FormGroup;
  private id?: number;
  editing = false;
  categories: CategoryResponse[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private planningService: PlanningService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private errorHandlingService: ErrorHandlerService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.configureForm();
    this.id = this.activatedRoute.snapshot.params['id'];

    if (this.id) {
      this.editing = true;
      this.findById(this.id);
    }
  }

  private findById(id: number) {
    this.planningService.findById(id).subscribe({
      next: (result) => {
        let planning = result;
        this.convertDates(planning);
        this.planningForm.patchValue(planning);
      },
      error: (error) => this.onError(error),
    });
  }

  private update(id: number, planning: Planning) {
    this.planningService.update(id, planning).subscribe({
      next: (result) => {
        this.convertDates(result);
        this.planningForm.patchValue(result);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Saved successfully',
        });
      },
      error: (error) => this.onError(error),
    });
  }

  private create(planning: Planning) {
    this.planningService.create(planning).subscribe({
      next: (result) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Saved successfully',
        });
        this.router.navigate(['/planning', result.id]);
      },
      error: (error) => this.onError(error),
    });
  }

  private configureForm() {
    this.planningForm = this.formBuilder.group({
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      dueDay: [
        '',
        [Validators.required, Validators.min(1), Validators.max(31)],
      ],
      type: ['', Validators.required],
      startAt: ['', Validators.required],
      endAt: ['', Validators.required],
      active: [true],
      showInstallmentsInBillName: [false],
      categoryId: [{ value: '', disabled: true }],
    });

    this.planningForm.get('type')?.valueChanges.subscribe((value) => {
      this.loadCategories(this.planningForm.get('type')?.value);
      this.planningForm.get('categoryId')?.enable();
    });
  }

  save(): void {
    let planning = this.planningForm.getRawValue() as Planning;

    if (this.id) {
      this.update(this.id, planning);
    } else {
      this.create(planning);
    }
  }

  private onError(error: any) {
    this.errorHandlingService.handle(error);
  }

  private convertDates(planning: Planning) {
    planning.startAt = this.parseToYearAndMonth(planning.startAt!);
    planning.endAt = this.parseToYearAndMonth(planning.endAt!);
  }

  private parseToYearAndMonth(dateString: any) {
    var dateParts = dateString.split('-');
    var date = new Date(dateParts[0], dateParts[1] - 1);
    return date;
  }

  loadCategories(type: string) {
    if (type) {
      this.categoryService.findByType(type).subscribe({
        next: (result) => {
          this.categories = result;
        },
        error: (error) => this.onError(error),
      });
    }
  }
}
