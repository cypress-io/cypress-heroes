import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, map, Observable } from 'rxjs';
import { ModalService } from '../../../app/services/modal.service';
import { HeroService } from '../../../app/services/hero.service';
import { Hero, HeroEditModel, Power } from '../../../app/services/models';
import { PowerService } from '../../../app/services/power.service';
import { ConfirmDeleteModalComponent } from '../../../app/components/confirm-delete-modal/confirm-delete-modal.component';

@Component({
  selector: 'app-hero-edit',
  templateUrl: './hero-edit.component.html'
})
export class HeroEditComponent implements OnInit {
  constructor(
    private heroService: HeroService,
    private powerService: PowerService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: ModalService
  ) {}

  $hero!: Observable<Hero>;
  $powers!: Observable<Power[]>;
  $heroData!: Observable<{ hero: Hero; powers: Power[] }>;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.$hero = this.heroService.getHero(id);
    this.$powers = this.powerService.getPowers();
    this.$heroData = combineLatest([this.$hero, this.$powers]).pipe(
      map(([hero, powers]) => ({ hero, powers }))
    );
  }

  async updateHero({ hero, file }: { hero: HeroEditModel; file?: File }) {
    this.heroService.updateHero(hero, file).subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }

  deleteHero(hero: Hero) {
    this.modalService.show(ConfirmDeleteModalComponent, {
      hero,
      onDelete: () => {
        this.heroService.deleteHero(hero.id).subscribe(() => {
          this.modalService.hide();
          this.heroService.getHeroes();
          this.router.navigateByUrl('/');
        });
      },
    });
  }
}
