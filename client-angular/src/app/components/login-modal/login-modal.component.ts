import { Component } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'login-modal',
  template: `
  <app-modal>
    <app-login-form (onLogin)="hideModal()"></app-login-form>
  </app-modal>`,
})
export class LoginModalComponent {
  constructor(private modalService: ModalService) {}

  hideModal() {
    this.modalService.hide();
  }
}
