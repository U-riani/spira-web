import { NgClass, NgIf } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [NgClass, NgIf, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  @ViewChild('openSearchButton') openSearchButton: ElementRef | undefined;
  @ViewChild('searchOffcanvasButton') searchOffcanvasButton:
    | ElementRef
    | undefined;
  isMenuOpen: boolean;
  isSearchOpen: boolean;

  constructor() {
    this.isMenuOpen = false;
    this.isSearchOpen = false;
  }

  toggleSearch(e: any, elem: any = '') {
    console.log(e);
    if (elem.id == 'openSearchButton') {
      this.isSearchOpen = !this.isSearchOpen;
      this.isMenuOpen = false;
      e.stopPropagation();
    } else {
      console.log('else');
      this.isSearchOpen = false;
    }
  }

  toggleMenu(e: MouseEvent | null) {
    if (
      e?.target instanceof HTMLElement &&
      e.target.closest('button')?.id === 'openMenuButton'
    ) {
      this.isMenuOpen = !this.isMenuOpen;
      this.isSearchOpen = false;
      e.stopPropagation();
    } else {
      this.isMenuOpen = false;
    }
  }

  onClose(e: MouseEvent | null) {
    const target = e?.target as HTMLElement | null;

    // Don't close if clicking one of the control buttons
    if (target?.closest('#openMenuButton')) {
      this.isSearchOpen = false;
    } else if (target?.closest('#openSearchButton')) {
      this.isSearchOpen = false;
    } else {
      this.isMenuOpen = false;
      this.isSearchOpen = false;
    }
  }
}
