import { Component, OnInit } from '@angular/core';
import { Hero, HeroEditModel, User } from '../../services/models';
import { HeroService } from '../../services/hero.service';
import { ModalService } from '../../../app/services/modal.service';
import { ConfirmDeleteModalComponent } from '../../../app/components/confirm-delete-modal/confirm-delete-modal.component';
import { AuthService } from '../../../app/services/auth.service';
import { Observable } from 'rxjs';
import { ConfirmHireModalComponent } from '../../../app/components/confirm-hire-modal/confirm-hire-modal.component';
import { AlertModalComponent } from '../../../app/components/alert-modal/alert-modal.component';

@Component({
  selector: 'app-hero-list',
  template: `
    <ul class="flex flex-wrap gap-8 justify-center">
      <li
        hero-card
        *ngFor="let hero of $heroes | async; trackBy: trackHeroRow"
        [hero]="hero"
        (onDeleteHero)="deleteHero($event)"
        (onHireHero)="hireHero($event)"
        (onLikeHero)="likeHero($event)"
        [user]="user"
        class="mt-8"
      ></li>
    </ul>
  `,
})
export class HeroListComponent implements OnInit {
  $heroes?: Observable<Hero[]>;
  user?: User;

  constructor(
    private heroService: HeroService,
    private authService: AuthService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.$heroes = this.heroService.getHeroes();
    this.authService.getUser().subscribe((user) => {
      this.user = user;
    });
  }

  likeHero(hero: Hero) {
    if (!this.user) {
      this.modalService.show(AlertModalComponent, {
        message: 'You must log in to like.',
      });
      return;
    }
    const heroUpdate: Partial<HeroEditModel> = {
      id: hero.id,
      fans: hero.fans + 1,
    };
    this.heroService.updatePartialHero(heroUpdate).subscribe(() => {
      this.heroService.getHeroes();
    });
  }

  hireHero(hero: Hero) {
    if (!this.user) {
      this.modalService.show(AlertModalComponent, {
        message: 'You must log in to hire this hero.',
      });
      return;
    }
    this.modalService.show(ConfirmHireModalComponent, {
      hero,
      onHire: () => {
        const heroUpdate: Partial<HeroEditModel> = {
          id: hero.id,
          saves: hero.saves + 1,
        };
        this.heroService.updatePartialHero(heroUpdate).subscribe(() => {
          this.modalService.hide();
          this.heroService.getHeroes();
        });
      },
    });
  }

  deleteHero(hero: Hero) {
    this.modalService.show(ConfirmDeleteModalComponent, {
      hero,
      onDelete: () => {
        this.heroService.deleteHero(hero.id).subscribe(() => {
          this.modalService.hide();
          this.heroService.getHeroes();
        });
      },
    });
  }

  trackHeroRow(_index: number, hero: Hero) {
    return hero.id;
  }
}
