import { NgClass, NgFor } from '@angular/common';
import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'app-releases',
  imports: [NgFor, NgClass],
  templateUrl: './releases.component.html',
  styleUrl: './releases.component.css',
})
export class ReleasesComponent implements AfterViewInit {
  @ViewChild('carouselItems', { static: true })
  carouselItems!: ElementRef<HTMLDivElement>;

  items = [
    { index: 1, color: 'bg-blue-500' },
    { index: 2, color: 'bg-red-500' },
    { index: 3, color: 'bg-green-500' },
    { index: 4, color: 'bg-yellow-500' },
    { index: 5, color: 'bg-green-500' },
    { index: 6, color: 'bg-yellow-500' },
    { index: 7, color: 'bg-green-500' },
  ];

  currentIndex = 0;
  itemWidth = 0;
  gapWidth = 20; // gap-5 = 20px
  screenWidth = window.innerWidth;
  VisibleItemsCunt = 0;

  ngAfterViewInit() {
    this.calculateItemWidth();
    if (window.innerWidth > 768 && window.innerWidth < 1024) {
      this.VisibleItemsCunt = 2;
    } else if (window.innerWidth >= 1024 && window.innerWidth < 1280) {
      this.VisibleItemsCunt = 3;
    } else if (window.innerWidth >= 1280 && window.innerWidth < 1536) {
      this.VisibleItemsCunt = 4;
    } else if (window.innerWidth > 1536) {
      this.VisibleItemsCunt = 5;
    } 
  }

  @HostListener('window:resize')
  onResize() {
    this.calculateItemWidth();
  }

  calculateItemWidth() {
    const firstItem = this.carouselItems.nativeElement
      .children[0] as HTMLElement;
    if (firstItem) {
      this.itemWidth = firstItem.offsetWidth + this.gapWidth;
    }
  }

  moveCarousel(direction: number) {
    if (window.innerWidth < 768) return; // Native scroll for small devices

    const itemsCount = this.items.length;

    if (
      direction === 1 &&
      this.currentIndex < itemsCount - this.VisibleItemsCunt
    ) {
      this.currentIndex++;
    } else if (direction === -1 && this.currentIndex > 0) {
      this.currentIndex--;
    }

    const scrollPosition = this.currentIndex * this.itemWidth;
    this.carouselItems.nativeElement.scrollTo({
      left: scrollPosition,
      behavior: 'smooth',
    });
  }

  startX = 0;

  onTouchStart(event: TouchEvent) {
    this.startX = event.touches[0].clientX;
  }

  onTouchEnd(event: TouchEvent) {
    if (window.innerWidth >= 768) return;

    const endX = event.changedTouches[0].clientX;
    if (endX < this.startX - 50) {
      this.moveCarousel(1);
    } else if (endX > this.startX + 50) {
      this.moveCarousel(-1);
    }
  }
}
