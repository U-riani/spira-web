import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { AboutComponent } from './components/about/about.component';
import { HomeLayoutComponent } from './components/homePage/home-layout/home-layout.component';
import { ArtistsComponent } from './components/artists/artists.component';

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
    ],
  },
];
