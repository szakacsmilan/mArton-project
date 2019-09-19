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
    // console.log(events);
    this.initFreeEventsList('2019-09-28', 1);
    console.log(this.freeEvents);
  }
  

  //Filling events list with the events already exists in the calendar
  initEventsList() {
    for (let i = 0; i < eventStarts.length; i++) {
      this.events.push(new Event(moment(eventStarts[i]['dateTime']), moment(eventEnds[i]['dateTime'])));
      // console.log(events[i]);
    }
  }

  // Find the free slots and fill the eventList with it
  // @param1: The date when freeslots needed
  // @param2: The length of the slot in Hour
  initFreeEventsList(expectedDate: string, slotLength: number) {
    const openingTime = 8;
    const closingTime = 20;
    let tempMinute = 0;
    for (let i = openingTime; i < closingTime;) {
      let isBefore = true;
      let tempEvent = new Event(
        moment(expectedDate).hour(i).minute(tempMinute), moment(expectedDate).hour(i + slotLength).minute(tempMinute));
      this.events.forEach(element => {
        if (moment(element.startTime).date() === 28) {
          if (moment(element.startTime).isSame(moment(tempEvent.startTime))) {
            isBefore = false;
            i++;
      
          }
        }
      });
      if (isBefore) {
        this.freeEvents.push(tempEvent);
        i += slotLength;
      }
    
    }  

  }




}
