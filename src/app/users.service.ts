import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  getData(){
    //msk weather
    let urlMSK='https://api.open-meteo.com/v1/forecast?latitude=55.7558&longitude=37.6176&daily=temperature_2m_max,temperature_2m_min&timezone=Europe%2FMoscow&start_date=2022-06-08&end_date=2022-09-10';
    let urlBerlin ='https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=temperature_2m_max,temperature_2m_min&timezone=Europe%2FBerlin&start_date=2022-06-08&end_date=2022-09-17';
    let urlTokyo ='https://api.open-meteo.com/v1/forecast?latitude=35.6785&longitude=139.6823&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo&start_date=2022-06-08&end_date=2022-09-17';
    return [this.http.get(urlBerlin), this.http.get(urlMSK), this.http.get(urlTokyo)];
  }
}
