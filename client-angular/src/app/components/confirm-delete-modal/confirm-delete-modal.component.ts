import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Hero } from '../../../app/services/models';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'confirm-delete-modal',
  template: `
    <app-modal>
      <div class="flex flex-col gap-4 text-center">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          Delete Hero?
        </h3>

        <p class="text-sm text-gray-500">
          Are you sure you want to delete this hero?
        </p>
        <div class="flex flex-col items-center text-sm text-gray-500">
          <app-avatar class="text-center" [hero]="hero"></app-avatar>
          <h5 class="mb-1 text-xl font-medium text-gray-500">
            {{ hero.name }}
          </h5>
        </div>

        <div class="flex gap-2 justify-end">
          <app-button type="danger" (click)="onDelete(hero)">Yes</app-button>
          <app-button type="outline" (click)="hideModal()" [focus]="true"
            >No</app-button
          >
        </div>
      </div>
    </app-modal>
  `
})
export class ConfirmDeleteModalComponent implements OnInit {
  constructor(private modalService: ModalService) {}

  @Input() hero!: Hero;
  @Input() onDelete!: any;

  ngOnInit(): void {}

  hideModal() {
    this.modalService.hide();
  }
}
