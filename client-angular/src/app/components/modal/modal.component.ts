import {
  animate,
  animateChild,
  group,
  query,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  HostListener,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  template: `
    <div [@modal]="visibility">
      <div
        class="fixed flex flex-col justify-center items-center top-0 left-0 insert-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
        (mousedown)="hideModal()"
      >
        <div
          class="p-8 border shadow-lg rounded-md bg-white relative -top-[10%]"
          (mousedown)="$event.stopPropagation()"
          [@modalDialog]="visibility"
        >
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
  animations: [
    trigger('modal', [
      state('void, hidden', style({ opacity: 0 })),
      state('visible', style({ opacity: 1 })),
      transition(':enter', [
        animate('50ms'),
        group([query('@modalDialog', animateChild())]),
      ]),
      transition(':leave', animate('50ms')),
    ]),
    trigger('modalDialog', [
      state(
        'void, hidden',
        style({ opacity: 0, transform: 'translateY(-60px)' })
      ),
      state('visible', style({ opacity: 1 })),
      transition(':enter', [animate('75ms')]),
      transition(':leave', [animate('75ms')]),
    ]),
  ],
})
export class ModalComponent {
  constructor(private modalService: ModalService) {}

  visibility: 'visible' | 'hidden' = 'visible';

  @ViewChild('modalContainer', { read: ViewContainerRef })
  modalContainer!: ViewContainerRef;

  @HostListener('window:keydown', ['$event'])
  hideModalOnEscapePress(event: KeyboardEvent) {
    if (event.code === 'Escape') {
      this.hideModal();
    }
  }

  hideModal() {
    this.visibility = 'hidden';
    this.modalService.hide();
  }
}
