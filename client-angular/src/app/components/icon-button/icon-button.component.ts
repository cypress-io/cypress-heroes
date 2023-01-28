import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html'
})
export class IconButtonComponent implements OnInit {
  @Input() icon!: 'money' | 'like' | 'pencil' | 'trash';

  constructor() { }

  ngOnInit(): void {
  }

}
