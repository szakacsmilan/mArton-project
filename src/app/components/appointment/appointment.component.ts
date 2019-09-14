import { Component, OnInit } from '@angular/core';

declare var events: any;

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  constructor() {
    console.log(events);
   }

  ngOnInit() {
  }

}
