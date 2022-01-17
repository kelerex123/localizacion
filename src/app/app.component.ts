import { Component, OnInit, AfterViewInit} from '@angular/core';
import {Map, marker, tileLayer } from 'leaflet';

import * as L from 'leaflet';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit{
  title = 'Localizacion';
  map:any;
  cordsLat: number = 0;
  cordsLon: number = 0;

  ngOnInit(): void {
    this.locate();
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    
  }

  locate(): void {
    if(!navigator.geolocation) {
      console.log("No esta soportado la localizacion");
    }

    navigator.geolocation.getCurrentPosition( (position) => {
      this.cordsLat = position.coords.latitude;
      this.cordsLon = position.coords.longitude;
      console.log(
        `lat: ${this.cordsLat}, lon: ${this.cordsLon}`
      );
      this.map = new Map('map').setView([this.cordsLat, this.cordsLon], 17);
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);
      
      marker([this.cordsLat, this.cordsLon]).addTo(this.map);
    });
  }

}
