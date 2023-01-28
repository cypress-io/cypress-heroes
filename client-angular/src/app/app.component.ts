import {
  Component,
  EmbeddedViewRef,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ModalService } from './services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(  ) {}



  @ViewChild('modalTemplate', { read: TemplateRef })
  modalTemplate!: TemplateRef<any>;


}
