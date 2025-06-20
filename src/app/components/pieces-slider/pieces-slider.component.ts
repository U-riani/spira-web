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
  standalone: true,
  imports: [NgIf],
  templateUrl: './pieces-slider.component.html',
  styleUrls: ['./pieces-slider.component.css'],
})
export class PiecesSliderComponent implements AfterViewInit, OnDestroy {
  @ViewChild('sliderCanvas', { static: false })
  sliderCanvas?: ElementRef<HTMLCanvasElement>;

  imagesEl: HTMLImageElement[] = [];
  textEl: HTMLElement[] = [];
  items: any[] = [];
  slider: any;
  currentIndex = 0;
  imagesReady = 0;
  slidesLength = 0;
  autoplayInterval: any;
  resizeTimeout: any;

  private prevButton?: Element;
  private nextButton?: Element;

  ngAfterViewInit(): void {
    document.documentElement.classList.add('js');
    setTimeout(() => this.initSlider());
    window.addEventListener('resize', this.debouncedResize);
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.debouncedResize);
    if (this.autoplayInterval) clearInterval(this.autoplayInterval);
    this.cleanupButtonListeners();
  }

  initSlider(): void {
    const canvas = this.sliderCanvas?.nativeElement;
    if (!canvas) return console.error('Canvas not found');

    this.updateCanvasSize(canvas);
    this.imagesEl = Array.from(document.querySelectorAll('.pieces-slider__image')) as HTMLImageElement[];
    this.textEl = Array.from(document.querySelectorAll('.pieces-slider__text')) as HTMLElement[];
    this.slidesLength = this.imagesEl.length;
    this.imagesReady = 0;
    this.items = [];

    this.imagesEl.forEach((imgEl) => {
      const img = new Image();
      img.onload = () => {
        this.imagesReady++;
        const scaledImg = this.getScaledImage(img, canvas.width, canvas.height);
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
      img.onerror = () => console.error(`Image failed to load: ${imgEl.src}`);
      img.src = imgEl.src;
    });
  }

  getScaledImage(img: HTMLImageElement, targetWidth: number, targetHeight: number): HTMLImageElement {
    const off = document.createElement('canvas');
    off.width = targetWidth;
    off.height = targetHeight;
    const ctx = off.getContext('2d')!;
    const imgRatio = img.width / img.height;
    const targetRatio = targetWidth / targetHeight;
    let drawWidth = targetWidth;
    let drawHeight = targetHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (imgRatio > targetRatio) {
      drawHeight = targetHeight;
      drawWidth = img.width * (targetHeight / img.height);
      offsetX = (targetWidth - drawWidth) / 2;
    } else {
      drawWidth = targetWidth;
      drawHeight = img.height * (targetWidth / img.width);
      offsetY = (targetHeight - drawHeight) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
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
    requestAnimationFrame(() => this.showItems(this.currentIndex));
  }

  showItems(index: number): void {
    this.slider.showPieces({ items: [index] });
    if (this.slider.draw) this.slider.draw();
    this.currentIndex = index;
  }

  hideItems(index: number): void {
    this.slider.hidePieces({ items: [index] });
  }

  startAutoplay(): void {
    if (this.autoplayInterval) clearInterval(this.autoplayInterval);
    this.autoplayInterval = setInterval(() => this.nextSlide(), 4000);
  }

  nextSlide(): void {
    this.hideItems(this.currentIndex);
    this.currentIndex = (this.currentIndex + 1) % this.slidesLength;
    this.showItems(this.currentIndex);
  }

  prevSlide(): void {
    this.hideItems(this.currentIndex);
    this.currentIndex = (this.currentIndex - 1 + this.slidesLength) % this.slidesLength;
    this.showItems(this.currentIndex);
  }

  initButtons(): void {
    this.cleanupButtonListeners();
    this.prevButton = document.querySelector('.pieces-slider__button--prev')!;
    this.nextButton = document.querySelector('.pieces-slider__button--next')!;
    this.prevButton?.addEventListener('click', this.prevSlide.bind(this));
    this.nextButton?.addEventListener('click', this.nextSlide.bind(this));
  }

  cleanupButtonListeners(): void {
    this.prevButton?.removeEventListener('click', this.prevSlide.bind(this));
    this.nextButton?.removeEventListener('click', this.nextSlide.bind(this));
    this.prevButton = undefined;
    this.nextButton = undefined;
  }

  debouncedResize = (): void => {
    if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => this.onResize(), 300);
  };

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
    alert(`Navigate clicked for slide ${this.currentIndex + 1}`);
  }
}

// import { NgIf } from '@angular/common';
// import {
//   Component,
//   AfterViewInit,
//   ElementRef,
//   ViewChild,
//   OnDestroy,
// } from '@angular/core';

// declare const Pieces: any;

// @Component({
//   selector: 'app-pieces-slider',
//   imports: [NgIf],
//   templateUrl: './pieces-slider.component.html',
//   styleUrls: ['./pieces-slider.component.css'],
// })
// export class PiecesSliderComponent implements AfterViewInit, OnDestroy {
//   @ViewChild('sliderCanvas', { static: false })
//   sliderCanvas?: ElementRef<HTMLCanvasElement>;

//   imagesEl: HTMLImageElement[] = [];
//   textEl: HTMLElement[] = [];
//   slidesLength = 0;
//   slider: any;
//   items: any[] = [];
//   currentIndex = 0;
//   imagesReady = 0;
//   autoplayInterval: any;

//   ngAfterViewInit(): void {
//     document.documentElement.classList.add('js');

//     setTimeout(() => {
//       this.initSlider();
//     });

//     window.addEventListener('resize', this.onResize.bind(this));
//   }

//   ngOnDestroy(): void {
//     window.removeEventListener('resize', this.onResize.bind(this));
//     if (this.autoplayInterval) clearInterval(this.autoplayInterval);
//   }

//   initSlider(): void {
//     const canvas = this.sliderCanvas?.nativeElement;
//     if (!canvas) return console.error('Canvas not found');

//     this.updateCanvasSize(canvas);

//     this.imagesEl = Array.from(
//       document.querySelectorAll('.pieces-slider__image')
//     ) as HTMLImageElement[];
//     this.textEl = Array.from(
//       document.querySelectorAll('.pieces-slider__text')
//     ) as HTMLElement[];
//     this.slidesLength = this.imagesEl.length;

//     this.imagesReady = 0;
//     this.items = [];

//     this.imagesEl.forEach((imgEl, i) => {
//       const img = new Image();
//       img.onload = () => {
//         this.imagesReady++;

//         const scaledImg = this.getScaledImage(img, canvas.width, canvas.height);

//         // ONLY add image item, no text or index
//         this.items.push({
//           type: 'image',
//           value: scaledImg,
//           options: {
//             angle: 0,
//             extraSpacing: { extraX: 100, extraY: 200 },
//             piecesWidth: () => Pieces.random(50, 200),
//             ty: () => Pieces.random(-400, 400),
//           },
//         });

//         if (this.imagesReady === this.slidesLength) {
//           this.startSlider(canvas);
//           // Start autoplay only after first draw
//           setTimeout(() => this.startAutoplay(), 100);
//           this.startAutoplay();
//           this.initButtons();
//         }
//       };
//       img.src = imgEl.src;
//       img.onerror = () => {
//         console.error(`Image failed to load: ${imgEl.src}`);
//       };
//     });
//   }

//   getScaledImage(
//     img: HTMLImageElement,
//     targetWidth: number,
//     targetHeight: number
//   ): HTMLImageElement {
//     const off = document.createElement('canvas');
//     off.width = targetWidth;
//     off.height = targetHeight;
//     const ctx = off.getContext('2d')!;

//     const imgRatio = img.width / img.height;
//     const targetRatio = targetWidth / targetHeight;

//     let drawWidth = targetWidth;
//     let drawHeight = targetHeight;
//     let offsetX = 0;
//     let offsetY = 0;

//     if (imgRatio > targetRatio) {
//       // Image is wider → fit height, crop width
//       drawHeight = targetHeight;
//       drawWidth = img.width * (targetHeight / img.height);
//       offsetX = (targetWidth - drawWidth) / 2;
//     } else {
//       // Image is taller → fit width, crop height
//       drawWidth = targetWidth;
//       drawHeight = img.height * (targetWidth / img.width);
//       offsetY = (targetHeight - drawHeight) / 2;
//     }

//     ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

//     const scaled = new Image();
//     scaled.src = off.toDataURL();
//     return scaled;
//   }

//   startSlider(canvas: HTMLCanvasElement): void {
//     this.slider = new Pieces({
//       canvas,
//       items: this.items,
//       x: 'centerAll',
//       y: 'centerAll',
//       piecesSpacing: 0,
//       fontFamily: ["'Open Sans'", 'sans-serif'],
//       animation: {
//         duration: () => Pieces.random(1000, 2000),
//         easing: 'easeOutQuint',
//       },
//     });
//     requestAnimationFrame(() => {
//       this.showItems(this.currentIndex);
//     });
//   }

//   showItems(index: number): void {
//     this.slider.showPieces({
//       items: [index], // Adjusted to single item per slide
//     });
//     if (this.slider.draw) {
//       this.slider.draw();
//     }
//     this.currentIndex = index; // Update currentIndex to trigger overlay update
//   }

//   hideItems(index: number): void {
//     this.slider.hidePieces({
//       items: [index],
//     });
//   }

//   startAutoplay(): void {
//     this.autoplayInterval = setInterval(() => {
//       this.nextSlide();
//     }, 4000);
//   }

//   nextSlide(): void {
//     this.hideItems(this.currentIndex);
//     this.currentIndex = (this.currentIndex + 1) % this.slidesLength;
//     this.showItems(this.currentIndex);
//   }

//   prevSlide(): void {
//     this.hideItems(this.currentIndex);
//     this.currentIndex =
//       (this.currentIndex - 1 + this.slidesLength) % this.slidesLength;
//     this.showItems(this.currentIndex);
//   }

//   initButtons(): void {
//     document
//       .querySelector('.pieces-slider__button--prev')
//       ?.addEventListener('click', () => this.prevSlide());
//     document
//       .querySelector('.pieces-slider__button--next')
//       ?.addEventListener('click', () => this.nextSlide());
//   }

//   onResize(): void {
//     const canvas = this.sliderCanvas?.nativeElement;
//     if (canvas) {
//       this.updateCanvasSize(canvas);
//       if (this.slider?.draw) this.slider.draw();
//     }
//   }

//   updateCanvasSize(canvas: HTMLCanvasElement): void {
//     canvas.width = canvas.clientWidth;
//     canvas.height = canvas.clientHeight;
//   }

//   onNavigate(): void {
//     // Example navigation logic
//     alert(`Navigate clicked for slide ${this.currentIndex + 1}`);
//   }
// }
