import { Component, OnInit } from '@angular/core';

declare var eventStarts: any;
declare var eventEnds: any;

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  constructor() {
   }

  ngOnInit() {
    console.log(eventStarts);
    console.log(eventEnds);
  }


}
