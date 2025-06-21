import { Component } from '@angular/core';

@Component({
  selector: 'app-show-cases',
  imports: [],
  templateUrl: './show-cases.component.html',
  styleUrl: './show-cases.component.css',
})
export class ShowCasesComponent {
  showCaseArray = [
    {
      name: 'Deep Nigth Sessions',
      date: 'March 12, 2025',
      place: 'Club Bassiani',
      Featuring: ['Alex Raider', 'Luna Deep'],
    },
    {
      name: 'Deep Nigth Sessions',
      date: '2025, March, 12',
      place: 'Club Bassiani',
      Featuring: ['Alex Raider', 'Luna Deep'],
    },
    {
      name: 'Deep Nigth Sessions',
      date: '2025, March, 12',
      place: 'Club Bassiani',
      Featuring: ['Alex Raider', 'Luna Deep'],
    },
    {
      name: 'Deep Nigth Sessions',
      date: '2025, March, 12',
      place: 'Club Bassiani',
      Featuring: ['Alex,Raider', 'Luna Deep'],
    },
  ];
}
