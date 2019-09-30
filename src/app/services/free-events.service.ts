import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Event } from 'src/app/models/Event';

declare var eventStarts: string[];
declare var eventEnds: string[];

@Injectable({
  providedIn: 'root'
})
export class FreeEventsService {

  eventsExist: Event[] = [];
  freeEvents: Event[] = [];

  constructor() { }

  // Filling events list with the events already exists in the calendar
  initEventsList() {
    this.eventsExist.length = 0;
    for (let i = 0; i < eventStarts.length; i++) {
      this.eventsExist.push(new Event(moment(eventStarts[i]['dateTime']),
      moment(eventEnds[i]['dateTime'])));
    }
  }

  // Find the free slots and fill the eventList with it
  // @param1: The date when freeslots needed
  // @param2: The length of the slot in Hour
  initFreeEventsList(expectedDate: string, slotLengthHour: number, slotLengthMinute: number) {
    this.freeEvents.length = 0;

    const openingTime = 8;
    const closingTime = 20;

    let tempStartMin = 0;
    let tempEndMin = slotLengthMinute;
    let tempHour = 0;

    for (let i = openingTime; i < closingTime;) {
      let isNotExistEvent = true;
      let tempEvent = new Event(
        moment(expectedDate).hour(i).minute(tempStartMin).format(),
        moment(expectedDate).hour(i + slotLengthHour + tempHour).minute(tempEndMin).format());

      this.eventsExist.forEach(element => {
        if (moment(element.startTime).date() === moment(tempEvent.startTime).date()) {
          if (moment(element.startTime).isSame(moment(tempEvent.startTime))
              || (moment(tempEvent.endTime).isBefore(moment(element.endTime)))
              && moment(tempEvent.endTime).isAfter(moment(element.startTime)) ||
              moment(element.endTime).isSame(moment(tempEvent.endTime))
          ) {
            isNotExistEvent = false;
            i = moment(element.endTime).hour();
            tempStartMin = moment(element.endTime).minute();
            if (tempStartMin === 0) {
              tempHour = 0;
              tempEndMin = slotLengthMinute;
            } else {
              tempHour = 1;
              tempEndMin = 0;
            }
          }
        }
      });
      if (isNotExistEvent) {
        tempStartMin = tempEndMin;
        tempEndMin += slotLengthMinute;
        if (tempEndMin == 60) {
          tempEndMin = 0;
          tempHour = 1;
        } else {
          if (slotLengthMinute !== 0){
            tempHour = 0;
            i += 1;
          }
        }
        tempEvent.startTimeToShow = moment(tempEvent.startTime).format('LT');
        tempEvent.endTimeToShow = moment(tempEvent.endTime).format('LT');
        this.freeEvents.push(tempEvent);
        i += slotLengthHour;
      }

    }
  }
}

