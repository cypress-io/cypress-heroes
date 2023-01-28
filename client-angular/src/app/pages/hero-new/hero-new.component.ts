import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeroEditModel, Power } from '../../services/models';
import { HeroService } from '../../services/hero.service';
import { PowerService } from '../../services/power.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hero-new',
  template: `
    <div
      class="flex flex-col w-full rounded-lg border shadow-md bg-gray-50 mt-8 relative"
      *ngIf="$powers | async as powers; else loading"
    >
      <div class="px-8 py-4">
        <app-hero-form
          [powers]="powers"
          (onSave)="createHero($event)"
        ></app-hero-form>
      </div>
    </div>

    <ng-template #loading> Loading... </ng-template>
  `,
})
export class HeroNewComponent implements OnInit {
  constructor(
    private heroService: HeroService,
    private powerService: PowerService,
    private location: Location
  ) {}

  $powers!: Observable<Power[]>;

  async createHero({ hero, file }: { hero: HeroEditModel; file?: File }) {
    this.heroService.addHero(hero, file).subscribe(() => {
      this.location.back();
    });
  }

  ngOnInit(): void {
    this.$powers = this.powerService.getPowers();
  }
}
