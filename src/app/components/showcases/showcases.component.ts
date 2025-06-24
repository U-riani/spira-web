import { Component } from '@angular/core';

@Component({
  selector: 'app-showcases',
  imports: [],
  templateUrl: './showcases.component.html',
  styleUrl: './showcases.component.css',
})
export class ShowcasesComponent {
  showcasesArray = [
    {
      imgSrc: 'assets/img/1.jpg',
      date: '2025-07-01',
      title: 'Showcase 1',
      description:
        'Our inaugural label presentation took place on December 1st 2023 at "SINA". The event featured the co-founders - TSOTT, SOLARMENTAL, and BLDNFLD - alongside AMARES for our debut showcase.',
    },
    {
      imgSrc: 'assets/img/2.jpg',
      date: '2025-07-01',
      title: 'Showcase 1',
      description:
        'Our inaugural label presentation took place on December 1st 2023 at "SINA". The event featured the co-founders - TSOTT, SOLARMENTAL, and BLDNFLD - alongside AMARES for our debut showcase.',
    },
    {
      imgSrc: 'assets/img/3.jpg',
      date: '2025-05-01',
      title: 'Showcase 1',
      description:
        'Our inaugural label presentation took place on December 1st 2023 at "SINA". The event featured the co-founders - TSOTT, SOLARMENTAL, and BLDNFLD - alongside AMARES for our debut showcase.',
    },
    {
      imgSrc: 'assets/img/4.jpg',
      date: '2025-06-01',
      title: 'Showcase 1',
      description:
        'Our inaugural label presentation took place on December 1st 2023 at "SINA". The event featured the co-founders - TSOTT, SOLARMENTAL, and BLDNFLD - alongside AMARES for our debut showcase.',
    },
  ];
}
