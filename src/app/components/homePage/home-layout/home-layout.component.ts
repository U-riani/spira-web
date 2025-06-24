import { Component } from '@angular/core';
import { PodcastComponent } from '../podcast/podcast.component';
import { ReleasesComponent } from '../releases/releases.component';
import { ShowCasesComponent } from '../show-cases/show-cases.component';
import { HeroComponent } from '../hero/hero.component';

@Component({
  selector: 'app-home-layout',
  imports: [
    
    PodcastComponent,
    ReleasesComponent,
    ShowCasesComponent,
    HeroComponent,
  ],
  templateUrl: './home-layout.component.html',
  styleUrl: './home-layout.component.css',
})
export class HomeLayoutComponent {}
