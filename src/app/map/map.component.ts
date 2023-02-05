import { style } from '@angular/animations';
import { NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as Rx from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as mapboxgl from 'mapbox-gl'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  map: mapboxgl.Map | undefined;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 45;
  lng = 90;
  zoom = 0;
  marker: any;

  xCoord: number = 0;
  yCoord: number = 0;
  geolocationPosition: any;
  current_location: any[] = [];
  marker_location: any;
  xStartCoord: number = 0;
  yStartCoord: number = 0;
  markerStyle: any = { 'left.%': this.xCoord, 'top.%': this.yCoord, 'display': 'none' };
  labelStyle: any = { 'display': 'none' };
  chartsStyle = {'opacity':'0', '-webkit-transform': 'translate(100%, 0)', 'transition' : 'opacity 0s, transform 1s'};
  marker_init: boolean = false;
  xMarkerCoord: any = 0;
  yMarkerCoord: any = 0;
  lat_field: any;
  lon_field: any;
  check = false;

  constructor(private _snackBar: MatSnackBar, private router: Router) { 
    (mapboxgl as any).accessToken = environment.mapbox.accessToken;
  }

  ngOnInit(): void {
    this.buildMap();
    
    this.marker = new mapboxgl.Marker();
    
  }
  
  buildMap() {    
    const navControl = new mapboxgl.NavigationControl({
      visualizePitch: true
    })
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [this.lng, this.lat],
      attributionControl: false,
    })

    this.map.addControl( new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true,
      showUserHeading: true,
      showUserLocation: true
    }))
    this.map.on('click', this.show.bind(this));
  }
  show(event:any) {
    console.log(event.lngLat);
    let coords = event.lngLat
    this.marker.setLngLat(coords).addTo(this.map);
    this.get_charts(coords);
  }

  get_charts(coords:any) {
    this.change_display_charts(true);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(['/weather-local', {latitude:coords.lat,longitude:coords.lng}]));
  
  }
  changeRoute() {
    this.change_display_charts(false);
    this.router.navigate(['/']);
  }
  change_display_charts(bool:boolean) {
    if (bool) {
      this.chartsStyle = {'opacity':'1', '-webkit-transform': 'translate(0)', 'transition' : 'opacity 0s, transform 1s'} 
    } else {
      { 
       this.chartsStyle = {'opacity':'0', '-webkit-transform': 'translate(100%, 0)', 'transition' : 'opacity 0s 1s, transform .5s'};
      }
    }
  } 
  
}