import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Event } from 'src/app/models/Event';

declare var eventStarts: string[];
declare var eventEnds: string[];

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  events: Event[] = [];
  freeEvents: Event[] = [];
  freeEventsToShow: Event[] = [];

  constructor() {
   }

  ngOnInit() {
    this.initEventsList();
    this.initFreeEventsList('2019-09-28', 0, 30);
    console.log(this.freeEvents);
  }

  // Filling events list with the events already exists in the calendar
  initEventsList() {
    for (let i = 0; i < eventStarts.length; i++) {
      this.events.push(new Event(moment(eventStarts[i]['dateTime']), moment(eventEnds[i]['dateTime'])));
    }
  }

  // Find the free slots and fill the eventList with it
  // @param1: The date when freeslots needed
  // @param2: The length of the slot in Hour
  initFreeEventsList(expectedDate: string, slotLengthHour: number, slotLengthMinute: number) {
    const openingTime = 8;
    const closingTime = 20;
    let startMinute = 0;
    let endMinute = slotLengthMinute;
    let tempHour = 0;

    for (let i = openingTime; i < closingTime;) {
      let isBefore = true;
      let tempEvent = new Event(
        moment(expectedDate).hour(i).minute(startMinute),
        moment(expectedDate).hour(i + slotLengthHour + tempHour).minute(endMinute));

      this.events.forEach(element => {
        if (moment(element.startTime).date() === moment(tempEvent.startTime).date()) {
          if (moment(element.startTime).isSame(moment(tempEvent.startTime)) || (moment(tempEvent.endTime).isBefore(moment(element.endTime))) && moment(tempEvent.endTime).isAfter(moment(element.startTime))){
            isBefore = false;
            i = moment(element.endTime).hour();
            startMinute = moment(element.endTime).minute();
          }
        }
      });
      if (isBefore) {
        startMinute = endMinute;
        endMinute += slotLengthMinute;
        if (endMinute == 60) {
          endMinute = 0;
          tempHour = 1;
        } else {
          if (slotLengthMinute !== 0){
            tempHour = 0;
            i += 1;
          }
        }
        this.freeEvents.push(tempEvent);
        i += slotLengthHour;
      }
    }
  }
}
