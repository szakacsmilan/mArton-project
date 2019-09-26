import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Event } from 'src/app/models/Event';
import { HairType } from 'src/app/models/HairTypes';


declare var eventStarts: string[];
declare var eventEnds: string[];

declare function loadGapi();
declare function initCreateEvent(startTime,endTime, title, email, description, phoneNum): any;


@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})

export class AppointmentComponent implements OnInit {

  events: Event[] = [];
  freeEvents: Event[] = [];

  nextWeekDays: string[] = [];

  genders: string[] = ['Nő', 'Férfi'];

  theSelectedGender: string = '';
  theSelectedHairType: HairType;

  theSelectedTimeslot: Event;


  isGenderSelected: boolean = false;
  isHairTypeSelected: boolean = false;

  hairTypesMan: HairType[] = [];
  hairTypesWoman: HairType[] = [];

  selectedDay: string;

  isPersonalDetailsFormShown: boolean = false;

  selectedName: string;
  selectedEmail: string;
  selectedTelnum: string;

  stepTwoCompleted = false;
  stepThreeCompleted = false;

  showForwardButton = false;




  constructor() {
   }

  ngOnInit() {
    loadGapi();
    this.initNextWeekDays();
    this.initHairTypes();

  }

  // Filling events list with the events already exists in the calendar
  initEventsList() {
    for (let i = 0; i < eventStarts.length; i++) {
      this.events.push(new Event(moment(eventStarts[i]['dateTime']), moment(eventEnds[i]['dateTime'])));
    }
  }

  initNextWeekDays(){
    const today = moment()
    for (let i = 1; i < 8; i++){
      this.nextWeekDays.push(moment().add(i, 'days').format('YYYY-MM-DD').toString());
    }
  }

  showPersonalDetailsForm(){
    this.stepTwoCompleted = true;
    this.isPersonalDetailsFormShown = true;
  }

  onCreateEvent(){
    initCreateEvent(this.theSelectedTimeslot.startTime,
    this.theSelectedTimeslot.endTime, this.selectedName, this.selectedEmail, this.theSelectedHairType.hairtype, this.selectedTelnum );
    this.stepThreeCompleted = true;
  }

  initHairTypes() {
    this.hairTypesMan.push(
      new HairType('Férfi hajvágás', 0, 30),
      new HairType('Férfi hajvágás + szakáll', 1, 0), new HairType('Férfi hajvágás + festés', 1, 30));
    this.hairTypesWoman.push(
      new HairType('Női frizuraszárítás', 0, 30), new HairType('Női hajvágás + szárítás', 1, 0), new HairType('Női hajtőfestés', 1, 0),
      new HairType('Női hajtőfestés + hajvágás', 1, 30), new HairType('Női teljes hajfestés', 1, 30),
      new HairType('Női teljes hajfestés + hajvágás', 2, 0),
      new HairType('Női balayage', 2, 0), new HairType('Női melír teljes hajon', 1, 30),
      new HairType('Női melír teljes hajon + hajvágás', 2, 0)
    );

  }

  onInitFreeEventsList() {
    this.initEventsList();
    console.log(this.selectedDay + this.theSelectedHairType.cuttingTimeHour + this.theSelectedHairType.cuttingTimeMinute);
    this.initFreeEventsList(this.selectedDay, this.theSelectedHairType.cuttingTimeHour, this.theSelectedHairType.cuttingTimeMinute);
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
        moment(expectedDate).hour(i).minute(startMinute).format(),
        moment(expectedDate).hour(i + slotLengthHour + tempHour).minute(endMinute).format());

      this.events.forEach(element => {
        if (moment(element.startTime).date() === moment(tempEvent.startTime).date()) {
          if (moment(element.startTime).isSame(moment(tempEvent.startTime)) 
          || (moment(tempEvent.endTime).isBefore(moment(element.endTime))) && moment(tempEvent.endTime).isAfter(moment(element.startTime))){
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
        tempEvent.startTimeToShow = moment(tempEvent.startTime).format('LT');
        tempEvent.endTimeToShow = moment(tempEvent.endTime).format('LT');
        this.freeEvents.push(tempEvent);
        i += slotLengthHour;
      }
    }
  }
}
