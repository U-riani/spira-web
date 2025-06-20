import { AfterViewInit, Component } from '@angular/core';

declare var Pieces: any;

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements AfterViewInit {

  piecesSlider: any;
  currentIndex: number = 0;

  ngAfterViewInit(): void {
    this.initSlider();
  }

  initSlider(): void {
    const canvas = document.querySelector('.pieces-slider__canvas');

    const items = [
      {
        type: 'image',
        value: 'https://cdn.prod.website-files.com/5e4acee523e6f10a8f056ea7/5e4acee923e6f10315056eb6_1581960936503-image1.jpg',
        options: { piecesWidth: 100 }
      },
      {
        type: 'text',
        value: 'Slide 1',
        options: { color: 'white', fontSize: 50 }
      },
      {
        type: 'image',
        value: 'https://cdn.prod.website-files.com/5e4acee523e6f10a8f056ea7/5e4acee949a3f50939f27841_1581960936437-image18.jpg',
        options: { piecesWidth: 100 }
      },
      {
        type: 'text',
        value: 'Slide 2',
        options: { color: 'white', fontSize: 50 }
      }
    ];

    this.piecesSlider = new Pieces({
      canvas: canvas,
      items: items,
      x: 'centerAll',
      y: 'centerAll',
      piecesSpacing: 1,
      animation: {
        duration: 2000,
        easing: 'easeOutQuint'
      }
    });

    this.showCurrentSlide();
  }

  showCurrentSlide() {
    this.piecesSlider.showPieces({ items: this.currentIndex * 2 });
    this.piecesSlider.showPieces({ items: this.currentIndex * 2 + 1 });
  }

  nextSlide() {
    this.piecesSlider.hidePieces({ items: [this.currentIndex * 2, this.currentIndex * 2 + 1] });
    this.currentIndex = (this.currentIndex + 1) % 2;
    this.showCurrentSlide();
  }

  prevSlide() {
    this.piecesSlider.hidePieces({ items: [this.currentIndex * 2, this.currentIndex * 2 + 1] });
    this.currentIndex = (this.currentIndex - 1 + 2) % 2;
    this.showCurrentSlide();
  }
}
