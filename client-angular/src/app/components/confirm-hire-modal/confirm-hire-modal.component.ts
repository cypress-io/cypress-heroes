import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../../app/services/models';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'confirm-hire-modal',
  template: `
    <app-modal>
      <div class="flex flex-col gap-4 text-center">
        <h3 class="text-lg leading-6 font-medium text-gray-900">Hire Hero?</h3>

        <p class="text-sm text-gray-500">
          Hire this hero for {{ hero.price | currency }}?
        </p>
        <div class="flex flex-col items-center text-sm text-gray-500">
          <app-avatar class="text-center" [hero]="hero"></app-avatar>
          <h5 class="mb-1 text-xl font-medium text-gray-500">
            {{ hero.name }}
          </h5>
        </div>

        <div class="flex gap-2 justify-end">
          <app-button type="danger" (click)="onHire(hero)">Yes</app-button>
          <app-button type="outline" (click)="hideModal()">No</app-button>
        </div>
      </div>
    </app-modal>
  `,
})
export class ConfirmHireModalComponent implements OnInit {
  constructor(private modalService: ModalService) {}

  @Input() hero!: Hero;
  @Input() onHire!: any;

  ngOnInit(): void {}

  hideModal() {
    this.modalService.hide();
  }
}
