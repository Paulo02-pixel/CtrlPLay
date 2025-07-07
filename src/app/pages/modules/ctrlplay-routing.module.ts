import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GamesComponent } from './games/games.component';
import { ShopComponent } from './shop/shop.component';
import { LibraryComponent } from './library/library.component';
import { NewsComponent } from './news/news.component';
import { StreamingComponent } from './streaming/streaming.component';
import { CommunityComponent } from './community/community.component';
import { ProfileComponent } from './profile/profile.component';
import { GameDetailComponent } from './game-detail/game-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'games', component: GamesComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'library', component: LibraryComponent },
  { path: 'news', component: NewsComponent },
  { path: 'streaming', component: StreamingComponent },
  { path: 'community', component: CommunityComponent },
  { path: 'game/:id', component: GameDetailComponent },
  { path: 'profile', component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CtrlplayRoutingModule { }
