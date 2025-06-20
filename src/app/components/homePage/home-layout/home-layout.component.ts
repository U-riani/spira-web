import { Component } from '@angular/core';
import { PiecesSliderComponent } from '../../pieces-slider/pieces-slider.component';
import { PodcastComponent } from "../podcast/podcast.component";
import { ReleasesComponent } from '../releases/releases.component';

@Component({
  selector: 'app-home-layout',
  imports: [PiecesSliderComponent, PodcastComponent, ReleasesComponent],
  templateUrl: './home-layout.component.html',
  styleUrl: './home-layout.component.css'
})
export class HomeLayoutComponent {

}
