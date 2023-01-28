import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div class="w-[280px] rounded-lg border shadow-md bg-gray-50">
      <div class="flex flex-col items-center">
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class CardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
