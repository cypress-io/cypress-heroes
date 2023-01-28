import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroEditComponent } from './pages/hero-edit/hero-edit.component';
import { HeroListComponent } from './pages/hero-list/hero-list.component';
import { HeroNewComponent } from './pages/hero-new/hero-new.component';


const routes: Routes = [
  { path: '', redirectTo: '/heroes', pathMatch: 'full' },
  { path: 'heroes', component: HeroListComponent },
  { path: 'heroes/:id/edit', component: HeroEditComponent },
  { path: 'heroes/new', component: HeroNewComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
