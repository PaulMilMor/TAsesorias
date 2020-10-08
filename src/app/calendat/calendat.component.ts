
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { setHours, setMinutes } from 'date-fns';
@Component({
  selector: 'app-calendat',
  templateUrl: './calendat.component.html',
  styleUrls: ['./calendat.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendatComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  view: CalendarView = CalendarView.Day;

  viewDate: Date = new Date();

  events: CalendarEvent[] = [
    {
      title: 'No event end date',
      start: setHours(setMinutes(new Date(), 0), 3),
   
    },
    {
      title: 'No event end date',
      start: setHours(setMinutes(new Date(), 0), 5),
      
    },
  ];
}
