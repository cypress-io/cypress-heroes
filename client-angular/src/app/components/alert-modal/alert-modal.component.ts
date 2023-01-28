import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'alert-modal',
  template: `
    <app-modal>
      <div class="flex flex-col gap-4 text-center">
        <div class="flex flex-col items-center text-sm text-gray-500">
          <h5 class="mb-1 text-xl font-medium text-gray-500">
            {{ message }}
          </h5>
        </div>

        <div class="flex gap-2 justify-end">
          <app-button type="outline" (click)="hideModal()">Ok</app-button>
        </div>
      </div>
    </app-modal>
  `,
})
export class AlertModalComponent implements OnInit {
  constructor(private modalService: ModalService) {}

  @Input() message!: string;
  ngOnInit(): void {}

  hideModal() {
    this.modalService.hide();
  }
}
