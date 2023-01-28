import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-field',
  template: `
    <label class="block mb-2 text-sm font-medium text-gray-500"
      >{{ label }}
      <ng-content select="[app-text-input]"></ng-content>
    </label>
    <div class="text-red-500">
      <ng-content select="[validation-errors]"></ng-content>
    </div>
  `,
})
export class InputFieldComponent implements OnInit {
  constructor() {}

  @Input() label!: string;
  ngOnInit(): void {}
}
