import { Component, OnInit } from '@angular/core';
import { AppRoutingModule } from '../../../app/app-routing.module';
import { ComponentsModule } from '../../../app/components/components.module';
import { HeaderComponent } from './header.component';

@Component({
  standalone: true,
  imports: [AppRoutingModule, ComponentsModule, HeaderComponent],
  selector: 'app-layout',
  template: `
    <div class="max-w-7xl mx-auto">
      <app-header></app-header>
      <div class="p-2 pt-8">
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class LayoutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
