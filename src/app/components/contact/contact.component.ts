import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';

/// <reference types=”@types/googlemaps” />
declare var google: any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  @ViewChild('gmap', {static: true}) gmapElement: any;
  map: any;

  constructor() { }

  ngOnInit() {
    let mapProp = {
      center: new google.maps.LatLng(47.4891555, 19.0554174),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }
}

