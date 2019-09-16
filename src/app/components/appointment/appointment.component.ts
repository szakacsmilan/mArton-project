import { Component, OnInit } from '@angular/core';

declare var eventStarts: string[];
declare var eventEnds: string[];

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  constructor() {
   }

  ngOnInit() {
    this.sliceDates(eventStarts);
    this.sliceDates(eventEnds);

  }

  //Slicing dateformat
  sliceDates(array: string[]){
    for (let i = 0; i<array.length; i++){
      array[i] = array[i]["dateTime"].slice(0, -6);
    }
  }

  


}
