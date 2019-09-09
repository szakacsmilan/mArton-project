import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AppointmentComponent } from '../appointment/appointment.component';


@Component({
  selector: 'app-logo-button',
  templateUrl: './logo-button.component.html',
  styleUrls: ['./logo-button.component.css']
})
export class LogoButtonComponent implements OnInit {


  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  onCreateAppointment() {
    this.dialog.open(AppointmentComponent, {
      width: '250px'});
    }
  }
