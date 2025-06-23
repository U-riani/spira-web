import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-artists',
  imports: [NgClass],
  templateUrl: './artists.component.html',
  styleUrl: './artists.component.css',
})
export class ArtistsComponent {
  screenWidth = window.innerWidth;
  artistsArray = [
    {
      name: 'Gio Gugava',
      role: 'DJ',
      imgSrc: 'assets/img/1.jpg',
      instagram: '#',
      soundCloud: '#',
      bandCamp: '#',
      facebook: '#',
    },
    {
      name: 'Gela Barkalia',
      role: 'aq ar vici ra info davwero',
      imgSrc: 'assets/img/2.jpg',
      instagram: '#',
      soundCloud: '#',
      bandCamp: '#',
      facebook: '#',
    },
    {
      name: 'QETI & UCHI',
      role: 'INFLU',
      imgSrc: 'assets/img/3.jpg',
      instagram: '#',
      soundCloud: '#',
      bandCamp: '#',
      facebook: '#',
    },
    {
      name: 'QETI & UCHI',
      role: 'INFLU',
      imgSrc: 'assets/img/3.jpg',
      instagram: '#',
      soundCloud: '#',
      bandCamp: '#',
      facebook: '#',
    },
    {
      name: 'QETI & UCHI',
      role: 'INFLU',
      imgSrc: 'assets/img/3.jpg',
      instagram: '#',
      soundCloud: '#',
      bandCamp: '#',
      facebook: '#',
    },
    {
      name: 'QETI & UCHI',
      role: 'INFLU',
      imgSrc: 'assets/img/3.jpg',
      instagram: '#',
      soundCloud: '#',
      bandCamp: '#',
      facebook: '#',
    },
    {
      name: 'QETI & UCHI',
      role: 'INFLU',
      imgSrc: 'assets/img/3.jpg',
      instagram: '#',
      soundCloud: '#',
      bandCamp: '#',
      facebook: '#',
    },
    {
      name: 'QETI & UCHI',
      role: 'INFLU',
      imgSrc: 'assets/img/3.jpg',
      instagram: '#',
      soundCloud: '#',
      bandCamp: '#',
      facebook: '#',
    },
    {
      name: 'QETI & UCHI',
      role: 'INFLU',
      imgSrc: 'assets/img/3.jpg',
      instagram: '#',
      soundCloud: '#',
      bandCamp: '#',
      facebook: '#',
    },
    {
      name: 'QETI & UCHI',
      role: 'INFLU',
      imgSrc: 'assets/img/3.jpg',
      instagram: '#',
      soundCloud: '#',
      bandCamp: '#',
      facebook: '#',
    },
    
  ];

  getColumns(): number {
    if (this.screenWidth < 786) {
      return 2;
    } else if (this.screenWidth < 1024) {
      return 3;
    } else if (this.screenWidth < 1536) {
      return 4;
    } else {
      return 5;
    }
  }

  //  Helper for chess pattern
  isChessCell(index: number): boolean {
    const cols = this.getColumns();
    const row = Math.floor(index / cols);
    const col = index % cols;
    return (row + col) % 2 === 0;
  }
}
