import {
  Component,
  ComponentRef,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal-container',
  template: ` <div #modalContainer></div> `,
})
export class ModalContainerComponent implements OnInit {
  constructor(private modalService: ModalService) {}

  modalRef?: ComponentRef<any>;

  @ViewChild('modalContainer', { read: ViewContainerRef })
  modalContainer!: ViewContainerRef;

  ngOnInit(): void {
    this.modalService.getModal().subscribe((modalInfo) => {
      if (this.modalRef) {
        this.modalRef.destroy();
        this.modalRef = undefined;
      }
      if (modalInfo) {
        this.modalRef = this.modalContainer.createComponent(
          modalInfo.component
        );
        Object.assign(this.modalRef.instance, modalInfo.props);
      }
    });
  }
}
