import { Component } from '@angular/core';
import { PiecesSliderComponent } from '../../pieces-slider/pieces-slider.component';
import { PodcastComponent } from '../podcast/podcast.component';
import { ReleasesComponent } from '../releases/releases.component';
import { ArtistsComponent } from '../artists/artists.component';
import { ShowCasesComponent } from '../show-cases/show-cases.component';
import { PlayerComponent } from '../../reusableComponents/player/player.component';

@Component({
  selector: 'app-home-layout',
  imports: [
    PiecesSliderComponent,
    PodcastComponent,
    ReleasesComponent,
    ArtistsComponent,
    ShowCasesComponent,
    PlayerComponent,
  ],
  templateUrl: './home-layout.component.html',
  styleUrl: './home-layout.component.css',
})
export class HomeLayoutComponent {}
