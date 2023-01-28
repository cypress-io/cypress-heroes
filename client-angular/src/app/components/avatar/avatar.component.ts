import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Hero } from '../../../app/services/models';

@Component({
  selector: 'app-avatar',
  template: `
    <img
      class="w-24 h-24 rounded-full shadow-md border border-gray-300"
      src="{{ hero.avatarUrl || '/assets/images/empty-avatar.webp' }}"
      alt="{{ hero.name }}"
    />
  `,
})
export class AvatarComponent implements OnInit {
  @Input() hero!: Hero;
  @Input() class?: string;

  constructor() {}

  ngOnInit(): void {}
}
