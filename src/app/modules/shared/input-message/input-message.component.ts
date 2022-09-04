import { Component, Input, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-input-message',
  templateUrl: './input-message.component.html',
  styleUrls: ['./input-message.component.css']
})
export class InputMessageComponent implements OnInit {

  @Input() error: string = '';
  @Input() control?: NgModel;
  @Input() text?: string;

  constructor() { }

  ngOnInit(): void {
  }

  hasError() {
      return this.control?.dirty && this.control?.hasError(this.error);
  }
}
