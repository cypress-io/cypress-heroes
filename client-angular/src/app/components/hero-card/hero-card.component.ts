import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Hero, User } from '../../services/models';

@Component({
  selector: '[hero-card]',
  templateUrl: './hero-card.component.html'
})
export class HeroCardComponent implements OnInit {
  @Input() hero!: Hero;
  @Input() user?: User;
  @Input() hideButtons: boolean = false;
  @Output() onDeleteHero = new EventEmitter<Hero>();
  @Output() onHireHero = new EventEmitter<Hero>();
  @Output() onLikeHero = new EventEmitter<Hero>();

  constructor() {}

  ngOnInit(): void { }

  hireHero() {
    this.onHireHero.emit(this.hero);
  }

  likeHero() {
    this.onLikeHero.emit(this.hero);
  }

  deleteHero() {
    this.onDeleteHero.emit(this.hero);
  }
}
