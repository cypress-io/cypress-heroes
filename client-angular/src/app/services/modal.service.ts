import { Injectable, Type } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  $modalRef = new Subject<{ component: Type<any>; props: any } | undefined>();

  getModal() {
    return this.$modalRef;
  }

  show(component: Type<any>, props?: any) {
    this.$modalRef.next({ component, props });
  }

  hide() {
    this.$modalRef.next(undefined);
  }
}
