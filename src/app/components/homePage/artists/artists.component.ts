import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-artists',
  imports: [NgClass],
  templateUrl: './artists.component.html',
  styleUrl: './artists.component.css',
})
export class ArtistsComponent {
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
      name: 'Gio Gugava',
      role: 'DJ',
      imgSrc: 'assets/img/1.jpg',
      instagram: '#',
      soundCloud: '#',
      bandCamp: '#',
      facebook: '#',
    },
    {
      name: 'Gio Gugava',
      role: 'DJ',
      imgSrc: 'assets/img/1.jpg',
      instagram: '#',
      soundCloud: '#',
      bandCamp: '#',
      facebook: '#',
    },
  ];
}
