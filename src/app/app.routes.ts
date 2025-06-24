import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { AboutComponent } from './components/about/about.component';
import { HomeLayoutComponent } from './components/homePage/home-layout/home-layout.component';
import { ArtistsComponent } from './components/artists/artists.component';
import { ReleasesComponent } from './components/releases/releases.component';
import { PodcastComponent } from './components/podcast/podcast.component';
import { ShowcasesComponent } from './components/showcases/showcases.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomeLayoutComponent,
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'artists',
        component: ArtistsComponent
      },
      {
        path: 'releases',
        component: ReleasesComponent
      },
      {
        path: 'podcasts',
        component: PodcastComponent
      },
      {
        path: 'showcases',
        component: ShowcasesComponent
      },
    ],
  },
];
