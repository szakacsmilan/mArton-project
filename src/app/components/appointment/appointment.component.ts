import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Event } from 'src/app/models/Event';
import { HairType } from 'src/app/models/HairTypes';
import { FreeEventsService } from 'src/app/services/free-events.service';

declare function loadGapi();
declare function initCreateEvent(startTime,endTime, title, email, description, phoneNum): any;


@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})

export class AppointmentComponent implements OnInit {

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

  constructor(public eventService: FreeEventsService) {}

  ngOnInit() {
    loadGapi();
    this.initNextWeekDays();
    this.initHairTypes();
  }

  initNextWeekDays() {
    const today = moment()
    for (let i = 1; i < 8; i++){
      this.nextWeekDays.push(moment().add(i, 'days').format('YYYY-MM-DD').toString());
    }
  }

  showPersonalDetailsForm(){
    this.stepTwoCompleted = true;
    this.isPersonalDetailsFormShown = true;
  }

  onCreateEvent() {
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
    this.eventService.initEventsList();
    this.eventService.initFreeEventsList(this.selectedDay, this.theSelectedHairType.cuttingTimeHour, this.theSelectedHairType.cuttingTimeMinute);
  }
}
