import { Component } from '@angular/core';
import { CarouselComponent } from '../carousel/carousel.component';
import { PiecesSliderComponent } from '../pieces-slider/pieces-slider.component';

@Component({
  selector: 'app-home',
  imports: [ PiecesSliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
