import { style } from '@angular/animations';
import { NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as Rx from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
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

  constructor(private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    window.onresize = (event) => {
      if (this.marker_init) {
        this.updateMarkerStyle(this.xMarkerCoord, this.yMarkerCoord, false);
        this.changeRoute();
      }
    }
  
    
  }
  get_charts() {
    this.change_display_charts(true);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(['/weather-local', {latitude:this.yMarkerCoord,longitude:this.xMarkerCoord}]));
  
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
  getCoords(e: any) {
    this.xMarkerCoord = Math.round((e.pageX * (360 / document.body.getElementsByClassName('map')[0].clientWidth) - 180) * 100) / 100;
    this.yMarkerCoord = Math.round((e.pageY * (-180 / document.body.getElementsByClassName('map')[0].clientHeight) + 90) * 100) / 100;
    this.updateMarkerStyle(this.xMarkerCoord, this.yMarkerCoord, true);
  }
  typeCoord(e: any, bool: boolean) {
    if (bool) {
      let yInput = Number(e.target.value);
      if (yInput >= -90 && yInput <= 90) {
        this.yMarkerCoord = Math.round(yInput * 100) / 100;
        e.target.value = this.yMarkerCoord;
      } else {
        this._snackBar.open(`Value must be in range of -90 to 90 but got ${yInput}`, 'Ok');
        e.target.value = this.yMarkerCoord;
        return;
      }

    } else {
      let xInput = Number(e.target.value);
      if (xInput >= -180 && xInput <= 180) {
        this.xMarkerCoord = Math.round(xInput * 100) / 100;
        e.target.value = this.xMarkerCoord;
      } else {
        this._snackBar.open(`Value must be in range of -180 to 180 but got ${xInput}`, 'Ok');
        e.target.value = this.xMarkerCoord;
        return;
      }
    }
    this.updateMarkerStyle(this.xMarkerCoord, this.yMarkerCoord, true);
  }
  getLocation(e: any, current: boolean) {
    if (current) {
      this.getCurrentLocation();
    } else {
      this.getCoords(e);
    }
  }
  updateMarkerStyle(x: number, y: number, current: boolean) {
    this.marker_init = true;
    let xcoord = x;
    let ycoord = y;
    if (document.body.clientWidth <= 1200) {
      xcoord = (((x + 180) * document.body.getElementsByClassName('map')[0].clientWidth) / 360);
      ycoord = (((y - 90) * document.body.getElementsByClassName('map')[0].clientHeight) / (-180));

      this.markerStyle = { 'left.px': xcoord, 'top.px': ycoord, 'display': 'block' };
    } else {
      xcoord = ((((x + 180) * document.body.getElementsByClassName('map')[0].clientWidth) / 360) / document.body.getElementsByClassName('map')[0].clientWidth) * 100;
      ycoord = ((((y - 90) * document.body.getElementsByClassName('map')[0].clientHeight) / (-180)) / document.body.getElementsByClassName('map')[0].clientHeight) * 100;

      this.markerStyle = { 'left.%': xcoord, 'top.%': ycoord, 'display': 'block' };
    }
    if (current) {
      this.labelStyle = { 'display': 'block' };
      window.scrollTo({
        left: xcoord - window.innerWidth / 2,
        top: ycoord - window.innerHeight / 2,
        behavior: 'smooth'
      })
    }
  }
  ngAfterViewInit() {
  }
  getCurrentLocation() {
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          this.geolocationPosition = position;
          this.yMarkerCoord = position.coords.latitude;
          this.xMarkerCoord = position.coords.longitude;
          this.yMarkerCoord = Math.round(this.yMarkerCoord * 100) / 100;
          this.xMarkerCoord = Math.round(this.xMarkerCoord * 100) / 100;

          this.updateMarkerStyle(this.xMarkerCoord, this.yMarkerCoord, true);

        },
        error => {
          switch (error.code) {
            case 1:
              console.log('Permission Denied');
              break;
            case 2:
              console.log('Position Unavailable');
              break;
            case 3:
              console.log('Timeout');
              break;
          }
        }
      );
    };
  }
}