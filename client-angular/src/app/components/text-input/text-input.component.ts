import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[app-text-input]',
})
export class TextInputComponent {
  constructor() {}

  @Input() expand: 'inline-block' | 'full' = 'inline-block';

  @HostBinding('class')
  get styles() {
    let styles =
      'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5';
    if (this.expand === 'full') {
      styles += ' w-full';
    }
    return styles;
  }

  class = ``;
}

@Directive({
  selector: '[validation-errors]',
})
export class ValidationErrorsComponent {
  constructor() {}

  @HostBinding('class')
  class = `text-red-500`;
}
