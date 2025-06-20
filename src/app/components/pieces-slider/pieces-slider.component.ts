import { NgIf } from '@angular/common';
import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  OnDestroy,
} from '@angular/core';

declare const Pieces: any;

@Component({
  selector: 'app-pieces-slider',
  imports: [NgIf],
  templateUrl: './pieces-slider.component.html',
  styleUrls: ['./pieces-slider.component.css'],
})
export class PiecesSliderComponent implements AfterViewInit, OnDestroy {
  @ViewChild('sliderCanvas', { static: false })
  sliderCanvas?: ElementRef<HTMLCanvasElement>;

  imagesEl: HTMLImageElement[] = [];
  textEl: HTMLElement[] = [];
  slidesLength = 0;
  slider: any;
  items: any[] = [];
  currentIndex = 0;
  imagesReady = 0;
  autoplayInterval: any;

  ngAfterViewInit(): void {
    document.documentElement.classList.add('js');

    setTimeout(() => {
      this.initSlider();
    });

    window.addEventListener('resize', this.onResize.bind(this));
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.onResize.bind(this));
    if (this.autoplayInterval) clearInterval(this.autoplayInterval);
  }

  initSlider(): void {
    const canvas = this.sliderCanvas?.nativeElement;
    if (!canvas) return console.error('Canvas not found');

    this.updateCanvasSize(canvas);

    this.imagesEl = Array.from(
      document.querySelectorAll('.pieces-slider__image')
    ) as HTMLImageElement[];
    this.textEl = Array.from(
      document.querySelectorAll('.pieces-slider__text')
    ) as HTMLElement[];
    this.slidesLength = this.imagesEl.length;

    this.imagesReady = 0;
    this.items = [];

    this.imagesEl.forEach((imgEl, i) => {
      const img = new Image();
      img.onload = () => {
        this.imagesReady++;
        const scaledImg = this.getScaledImage(img, canvas.width, canvas.height);

        // ONLY add image item, no text or index
        this.items.push({
          type: 'image',
          value: scaledImg,
          options: {
            angle: 0,
            extraSpacing: { extraX: 100, extraY: 200 },
            piecesWidth: () => Pieces.random(50, 200),
            ty: () => Pieces.random(-400, 400),
          },
        });

        if (this.imagesReady === this.slidesLength) {
          this.startSlider(canvas);
          this.startAutoplay();
          this.initButtons();
        }
      };
      img.src = imgEl.src;
    });
  }

  getScaledImage(
    img: HTMLImageElement,
    width: number,
    height: number
  ): HTMLImageElement {
    const off = document.createElement('canvas');
    off.width = width;
    off.height = height;
    const ctx = off.getContext('2d')!;
    ctx.drawImage(img, 0, 0, width, height);
    const scaled = new Image();
    scaled.src = off.toDataURL();
    return scaled;
  }

  startSlider(canvas: HTMLCanvasElement): void {
    this.slider = new Pieces({
      canvas,
      items: this.items,
      x: 'centerAll',
      y: 'centerAll',
      piecesSpacing: 0,
      fontFamily: ["'Open Sans'", 'sans-serif'],
      animation: {
        duration: () => Pieces.random(1000, 2000),
        easing: 'easeOutQuint',
      },
    });
    this.showItems(this.currentIndex);
  }

  showItems(index: number): void {
    this.slider.showPieces({
      items: [index], // Adjusted to single item per slide
    });
    this.currentIndex = index; // Update currentIndex to trigger overlay update
  }

  hideItems(index: number): void {
    this.slider.hidePieces({
      items: [index],
    });
  }

  startAutoplay(): void {
    this.autoplayInterval = setInterval(() => {
      this.nextSlide();
    }, 4000);
  }

  nextSlide(): void {
    this.hideItems(this.currentIndex);
    this.currentIndex = (this.currentIndex + 1) % this.slidesLength;
    this.showItems(this.currentIndex);
  }

  prevSlide(): void {
    this.hideItems(this.currentIndex);
    this.currentIndex =
      (this.currentIndex - 1 + this.slidesLength) % this.slidesLength;
    this.showItems(this.currentIndex);
  }

  initButtons(): void {
    document
      .querySelector('.pieces-slider__button--prev')
      ?.addEventListener('click', () => this.prevSlide());
    document
      .querySelector('.pieces-slider__button--next')
      ?.addEventListener('click', () => this.nextSlide());
  }

  onResize(): void {
    const canvas = this.sliderCanvas?.nativeElement;
    if (canvas) {
      this.updateCanvasSize(canvas);
      if (this.slider?.draw) this.slider.draw();
    }
  }

  updateCanvasSize(canvas: HTMLCanvasElement): void {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
  }

  onNavigate(): void {
    // Example navigation logic
    alert(`Navigate clicked for slide ${this.currentIndex + 1}`);
  }
}
