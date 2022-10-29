import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class PostService {


  constructor(public httpClient: HttpClient) {
  }

  getPosts(latitude:number = 0, longtitude:number = 0, t_unit:boolean) {  
    let t_unit_string = '';
    if (t_unit) {
      t_unit_string = 'temperature_unit=fahrenheit&'
    };
    return this.httpClient.get(`http://api.open-meteo.com/v1/forecast/?latitude=${ latitude }&longitude=${ longtitude }&hourly=temperature_2m,relativehumidity_2m,rain,snowfall,precipitation,cloudcover,surface_pressure,windspeed_10m,winddirection_10m&windspeed_unit=ms&${ t_unit_string }timeformat=unixtime&timezone=auto`);
  }                             
  getCityJson() {
    return this.httpClient.get('https://raw.githubusercontent.com/lutangar/cities.json/master/cities.json');
  }
  getCounryCSV() {
    return this.httpClient.get('https://pkgstore.datahub.io/core/country-list/data_csv/data/d7c9d7cfb42cb69f4422dec222dbbaa8/data_csv.csv', {responseType: 'text'});
  }
}
