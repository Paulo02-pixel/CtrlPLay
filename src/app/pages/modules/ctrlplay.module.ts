import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CtrlplayRoutingModule } from './ctrlplay-routing.module';
import { PrimeNgModule } from '../../prime-ng/prime-ng.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GamesComponent } from './games/games.component';
import { FormsModule } from '@angular/forms';
import { ShopComponent } from './shop/shop.component';
import { LibraryComponent } from './library/library.component';
import { NewsComponent } from './news/news.component';
import { StreamingComponent } from './streaming/streaming.component';
import { CommunityComponent } from './community/community.component';
import { ProfileComponent } from './profile/profile.component';
import { GameDetailComponent } from './game-detail/game-detail.component';


@NgModule({
  declarations: [
    DashboardComponent,
    GamesComponent,
    ShopComponent,
    LibraryComponent,
    NewsComponent,
    StreamingComponent,
    CommunityComponent,
    ProfileComponent,
    GameDetailComponent
  ],
  imports: [
    CommonModule,
    CtrlplayRoutingModule,
    PrimeNgModule,
    FormsModule
  ]
})
export class CtrlplayModule { }
