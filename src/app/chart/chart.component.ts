import { Component, OnInit, Inject } from '@angular/core';
import * as Highcharts from 'highcharts';
declare var require: any;
require('highcharts/highcharts-more')(Highcharts);
import { HighchartsChartModule } from 'highcharts-angular';
require('highcharts/modules/annotations')(Highcharts);
import { PostService } from '../services/post.service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

interface tableClass {
  temp: number;
  rain: number;
  cloud: number;
  windSpeed: number;
  windDir: string;
  iconStyle: string;
};
interface arrayTableClass extends Array<tableClass> { };

let country_name: string;
let country_code: string;
country_name = 'Moscow';
country_code = 'RU';



@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class Chart implements OnInit, HighchartsChartModule {

  cities = [
    {
      "country": "RU",
      "name": "Moscow"
    },
    {
      "country": "ES",
      "name": "Madrid"
    },
    {
      "country": "AM",
      "name": "Yerevan"
    },
    {
      "country": "DE",
      "name": "Berlin"
    },
    {
      "country": "GB",
      "name": "London"
    },
    {
      "country": "US",
      "name": "New York City",
    },
    {
      "country": "JP",
      "name": "Kyoto"
    },
    {
      "country": "CA",
      "name": "Ottawa"
    },
    {
      "country": "IT",
      "name": "Rome"
    },
    {
      "country": "GE",
      "name": "Tbilisi"
    },
    {
      "country": "JP",
      "name": "Tokyo"
    }
  ];
  selected = this.cities[0];

  humidity_chart_gauge: any;
  pressure_chart_gauge: any;
  wind_chart_gauge: any;

  humidity_chart_area: any;
  pressure_chart_area: any;
  wind_chart_area: any;
  change_wind_check = true;

  localTime:any;
  localTimezone:any;
  latitudeS: any;
  longitudeS: any;
  selectedType_form = new FormControl('spline');
  selectedType: string = 'spline';
  longitude: number = 0;
  latitude: number = 0;
  button_model: any;
  menu_text: string = 'Extended query by parameters';
  selected_temp = new FormControl('C');
  selected_unit_celsius = false;
  countries_list: any[] = [[], []];
  cities_list: any[] = [[], []];
  check_box = false;

  humidity_chartOptions_area: any = {
    chart: {
      type: 'areaspline',
      backgroundColor: 'transparent',
      style: {
        fontFamily: 'Roboto, "Helvetica Neue", sans-serif',
        fontWeight: 'lighter'
      },
      height: '100%'
    },
    credits: {
      enabled: false
    },
    data: {
      dateFormat: 'dd/mm/YYYY'
    },
    title: {
      align: 'left',
      useHTML: true,
      text: "<img class='chart_title_icon' src='https://www.svgrepo.com/show/12100/drop.svg' alt='' />" + "<p>Humidity</p>",
      y: 4
    },
    yAxis: {
      max: 100,
      gridLineColor: 'rgba(20,20,20,.3)',
      title: {
        text: ""
      },
      labels: {
        enabled: true
      }
    },
    xAxis: {
      type: "datetime",
      crosshair: {
        color: 'rgb(240, 175, 0)',
        width: 2
      },
      plotLines: [{
        zIndex: 9,
        color: '#14143d',
        width: 2,
        value: 0
      }],
      labels: {
        enabled: true
      }
    },
    tooltip: {
      valueSuffix: " %"
    },
    legend: {
      enabled: false
    },
    series: [
      {
        name: 'Humidity',
        data: 0
      }
    ],
    plotOptions: {
      areaspline: {
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1
          },
          stops: [
            [0, 'rgba(50, 88, 227, 1)'],
            [1, 'rgba(184, 197, 242, .8)']

          ]
        }
      },
      line: {
        dataLabels: {
          enabled: true
        }
      },
      series: {
        color: '#444',
        threshold: -Infinity,
        marker: {
          enabled: false,
        },
      }
    }
  }
  pressure_chartOptions_area: any = {
    chart: {
      type: 'areaspline',
      backgroundColor: 'transparent',
      style: {
        fontFamily: 'Roboto, "Helvetica Neue", sans-serif',
        fontWeight: 'lighter'
      },
      height: '100%',

    },
    credits: {
      enabled: false
    },
    data: {
      dateFormat: 'dd/mm/YYYY'
    },
    title: {
      align: 'left',
      useHTML: true,
      text: "<img class='chart_title_icon' src='https://www.svgrepo.com/show/41424/barometer.svg' alt='' />" + "<p>Pressure</p>",
      y: 4
    },
    yAxis: {
      gridLineColor: 'rgba(20,20,20,.3)',
      title: {
        text: ""
      },
      labels: {
        enabled: true
      }
    },
    xAxis: {
      type: "datetime",

      crosshair: {
        color: 'rgb(240, 175, 0)',
        width: 2
      },
      plotLines: [{
        zIndex: 9,
        color: '#14143d',
        width: 2,
        value: 0
      }],
      labels: {
        enabled: true
      },

    },
    tooltip: {
      valueSuffix: " mm Hg"
    },
    legend: {
      enabled: false
    },
    series: [
      {
        name: 'Surface pressure',
        data: 700
      }
    ],
    plotOptions: {
      areaspline: {
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1
          },
          stops: [
            [0, 'rgba(50, 88, 227, 1)'],
            [1, 'rgba(184, 197, 242, .8)']

          ]
        }
      },
      line: {
        dataLabels: {
          enabled: true
        }
      },
      series: {
        color: '#444',
        threshold: -Infinity,
        marker: {
          enabled: false,
        },
      }
    }
  }

  wind_chartOptions_area: any = {
    chart: {
      type: 'areaspline',
      backgroundColor: 'transparent',
      style: {
        fontFamily: 'Roboto, "Helvetica Neue", sans-serif',
        fontWeight: 'lighter'
      },
      height: '100%'
    },


    credits: {
      enabled: false
    },
    data: {
      dateFormat: 'dd/mm/YYYY'
    },
    title: {
      align: 'left',
      useHTML: true,
      text: "<img class='chart_title_icon' src='https://www.svgrepo.com/show/76131/wind.svg' alt='' />" + "<p>Wind speed</p>",
      y: 4
    },
    yAxis: {
      gridLineColor: 'rgba(20,20,20,.3)',
      title: {
        text: ""
      },
      labels: {
        enabled: true
      }
    },
    tooltip: {
      valueSuffix: " m/s"
    },
    xAxis: {
      type: "datetime",
      crosshair: {
        color: 'rgb(240, 175, 0)',
        width: 2
      },
      plotLines: [{
        zIndex: 9,
        color: '#14143d',
        width: 2,
        value: 0
      }],
      labels: {
        enabled: true
      }
    },

    legend: {
      enabled: false
    },
    series: [
      {

        name: 'Wind speed',
        data: 0,
        tooltip: {
          valueSuffix: " m/s"
        }
      },
      {

        type: 'scatter',
        name: "Wind direction",
        data: 0,
        tooltip: {
          valueSuffix: " *"
        },
        pointWidth: 200,
        borderColor: 'transparent',
      }
    ],
    plotOptions: {
      areaspline: {
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1
          },
          stops: [
            [0, 'rgba(50, 88, 227, 1)'],
            [1, 'rgba(184, 197, 242, .8)']

          ]
        }
      },
      line: {
        dataLabels: {
          enabled: true
        }
      },
      scatter: {
        marker: {
          enabled: true,
        }
      },
      series: {
        color: '#444',
        threshold: -Infinity,
        marker: {
          enabled: false,
        },
      }
    }
  }

  chartOptions: any = {
    chart: {
      type: this.selectedType,
      zoomType: 'x',
      backgroundColor: 'transparent',
      style: {
        fontFamily: 'Roboto, "Helvetica Neue", sans-serif',
        fontWeight: 'lighter'
      },
    },
    annotations: [{
      labels: [{
        point: { x: 0, y: 0 },
        text: 'Label',
        backgroundColor: 'greenyellow',
        style: {
          color: 'black'
        }
      }]
    }],
    credits: {
      enabled: false
    },

    data: {
      dateFormat: 'dd/mm/YYYY'
    },
    title: {
      align: 'left',
      useHTML: true,
      text: '',
      y: 4
    },
    xAxis: {

      lineColor: 'rgba(20,20,20,.5)',
      type: "datetime",
      crosshair: {
        color: 'rgb(240, 175, 0)',
        width: 2
      },
      plotLines: [{

        zIndex: 9,
        color: '#FF0000', // Red
        width: 2,
        value: 0 // Position, you'll have to translate this to the values on your x axis
      }],
    },
    yAxis: {

      gridLineColor: 'rgba(20,20,20,.3)',
      title: {
        text: "Temperature °C"
      }
    },
    tooltip: {
      valueSuffix: " °C"
    },
    legend: {
      enabled: false
    },
    series: [
      {
        name: 'Tokyo',
        data: 0
      }
    ],
    plotOptions: {
      areaspline: {
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1
          },
          stops: [
            [0, 'rgb(233, 75, 75)'],
            [1, 'rgba(79, 98, 204, 0.7)']

          ]
        }
      },
      line: {

        dataLabels: {
          enabled: true
        }
      },
      series: {
        color: 'rgba(20,20,20,.5)',
        borderColor: 'transparent',
        threshold: -Infinity,
        marker: {
          enabled: false,
        },
      }
    }
  };
  wind_chartOptions_gauge: any = {
    chart: {
      height: '100%',
      type: 'gauge',
      backgroundColor: 'transparent',
      style: {
        fontFamily: 'Roboto, "Helvetica Neue", sans-serif',
        fontWeight: 'lighter'
      },


    },
    credits: {
      enabled: false
    },
    title: {
      align: 'left',
      useHTML: true,
      text: "<img class='chart_title_icon' src='https://www.svgrepo.com/show/76131/wind.svg' alt='' />" + "<p>Wind speed and direction</p>",
      y: 4
    },
    pane: {
      startAngle: 0,
      endAngle: 360,
      background: null,
      center: ['50%', '50%'],
      size: '80%',
    },
    series: [
      {
        name: '',
        type: 'gauge',
        data: [82],
        tooltip: {
          valueSuffix: ""
        },
        dataLabels: {
          enabled: false,
          borderWidth: 0
        },

        dial: {

          //radius: '90%',
          //topWidth: 1,
          //baseWidth:10,
          //baseLength: 1,
          backgroundColor: 'white',
          borderWidth: 1,
          borderColor: 'black',

          radius: '90%',
          topWidth: 1,
          baseWidth: 30,
          rearLength: -60,
          baseLength: 60

        },

      },
      {

        name: 'Wind speed',
        dataLabels: {
          zIndex: 9,
          format: '{y} m/s',
          borderWidth: 0,
          y: -14,
          color: '#FFFFFF',
          style: {
            fontSize: '14px'
          }
        },
        dial: {
          radius: 0
        }
      }
    ],

    plotOptions: {

      series: {
        type: 'gauge',


      },
      gauge: {
        pivot: {
          radius: 0,
        }
      }
    },

    yAxis: [{
      offset: -10,
      lineWidth: 0,
      min: 0,
      max: 360,
      minorTicks: true,
      tickColor: 'rgba(20,20,20,.5)',
      tickPixelInterval: 5,
      tickPositions: [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340],
      tickPosition: 'outside',
      minorTickPosition: 'outside',
      minorTickLength: 10,
      tickLength: 20,
      tickWidth: 3,
      rotation: 15,
      labels: {
        enabled: true,
        distance: 30,
      },

    },
    {

      lineWidth: 0,
      min: 0,
      max: 4,
      tickWidth: 0,
      categories: ['N', 'E', 'S', 'W'],
      tickPositions: [0, 1, 2, 3],
    }
    ]
  };
  highcharts: any;
  RouteLat = 0;
  RouteLon = 0;
  table_header_time: any = [];
  table_body_temp: any = [];
  table_body_rain: any = [];
  table_body_rain_pers: any = [];
  table_body_wind_speed: any = [];
  table_body_wind_direction: any = [];
  table_body_cloud: any = [];
  table_array: any = [];
  table_array_class: arrayTableClass = [];
  form: FormGroup = new FormGroup({});
  weather_icon_style = {'background-image':'url(https://cdn-icons-png.flaticon.com/512/869/869869.png)'};

  constructor(public service: PostService, public dialog: MatDialog, private _snackBar: MatSnackBar, private Route: ActivatedRoute) {
    this.RouteLat = Number(this.Route.snapshot.paramMap.get('latitude'));
    this.RouteLon = Number(this.Route.snapshot.paramMap.get('longitude'));
  }

  ngOnInit(): void {
    this.get_country();
    country_name = 'Moscow';
    country_code = 'RU';
    if (this.Route.component == Chart) {
      this.get_forecast(this.RouteLat, this.RouteLon, '', this.selected_unit_celsius)
    } else {
      
      this.getUpToData(country_code, country_name, this.selected_unit_celsius);
    }
  }

  ngAfterViewInit() {

  }

  getUpToData(code: string, country: string, t_unit: boolean) {
    let latitude: number;
    let longitude: number;

    this.service.getCityJson().subscribe(Response => {
      let items = JSON.stringify(Response);
      for (let item of JSON.parse(items)) {
        if (item.name == country && item.country == code) {
          latitude = item.lat;
          longitude = item.lng;
        }
      }
      if (latitude == undefined && longitude == undefined) {
        this._snackBar.open("No Such country", "Ok");
        return;
      }
      this.get_forecast(latitude, longitude, country, t_unit);


    });
  }
  get_forecast(latitude: any, longitude: any, country: any, t_unit: boolean) {

    this.service.getPosts(latitude, longitude, t_unit).subscribe(Response => {
      let posts: any;
      let post = [];
      let data_array: any = [];
      let today = new Date().toUTCString(); //GMT
      let title: string;
      let temperature_current: any;

      let humidity_current: any;
      let humidity_values: any = [];

      let pressure_curent: any;
      let pressure_values: any = [];

      let wind_current_speed: any;
      let wind_current_direction: any;
      let wind_values: any = [];
      let wind_direction_value: any = [];


      let now: any;

      let p = 60 * 60 * 1000;


      if (country !== '') {
        title = "<img class='chart_title_icon' src='https://www.svgrepo.com/show/199819/thermometer-temperature.svg' alt='' />" + `<p>Temperature in ${country}</p>`;
      } else {
        title = "<img class='chart_title_icon' src='https://www.svgrepo.com/show/199819/thermometer-temperature.svg' alt='' />" + `<p>Temperature by ${latitude}°N ${longitude}°E</p>`
      }
      let now_checked = false;
      posts = Response;
      post = posts.hourly;
      let string_offset;
      now = Date.parse(today) + posts.utc_offset_seconds * 1000;
      if (posts.utc_offset_seconds >= 0) {
        string_offset = "+"+String(posts.utc_offset_seconds/3600)
      } else {
        string_offset = String(posts.utc_offset_seconds/3600)
      }
      this.localTimezone = posts.timezone + " (UTC" + string_offset + ")";
      this.latitudeS = posts.latitude;
      this.longitudeS = posts.longitude;
      let now_h = new Date(now).getUTCHours().toString().padStart(2,'0');
      let now_m = new Date(now).getUTCMinutes().toString().padStart(2,'0');
      let now_day = new Date(now).getUTCDate().toString().padStart(2,'0');
      let now_month = new Date(now).getUTCMonth().toString().padStart(2,'0');
      let now_year = new Date(now).getUTCFullYear().toString().padStart(4,'0');
      this.localTime = `${now_h}:${now_m} ${now_day}.${now_month}.${now_year}`
      //this.localTime = new Date(now).toUTCString();
      let now_hour = Math.round(now / p) * p;
      let index_24 = 10000;
      let index_0 = 10000;
      let index = 0;
      let index_th = 0;
      for (let item of post.time) {

        data_array[index] = [(item + posts.utc_offset_seconds) * 1000];
        if (now_checked) {
          index_24 = index + 24;
          now_checked = false;
        }

        if (index <= index_24) {
          humidity_values[index] = [(item + posts.utc_offset_seconds) * 1000];
          pressure_values[index] = [(item + posts.utc_offset_seconds) * 1000];
          wind_values[index] = [(item + posts.utc_offset_seconds) * 1000];
          wind_direction_value[index] = [(item + posts.utc_offset_seconds) * 1000];

        }
        if (Number(data_array[index][0]) == (now_hour)) {
          
          temperature_current = post.temperature_2m[index];
          humidity_current = post.relativehumidity_2m[index];
          pressure_curent = Math.round(post.surface_pressure[index] / 1.333);
          wind_current_speed = post.windspeed_10m[index];
          wind_current_direction = post.winddirection_10m[index];
          now_checked = true;
          index_0 = index;
        }
        if (index >= index_0 && index <= index_24) {
          let date = new Date((item + posts.utc_offset_seconds) * 1000);
          let newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
          
          let hours = newDate.getHours();
          let minutes = newDate.getMinutes();
          let day = newDate.getDate();
          let month = newDate.getMonth() + 1;
          let time = `${day.toString().padStart(2,'0')}.${month.toString().padStart(2,'0')}\n${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}`;
          this.table_header_time[index_th] = [time];
          let indWindDir = this.calc_wind_dir(post.winddirection_10m[index]);
          let cloud_int:number = 0;
          let rain_bool:boolean = false;
          let snow_bool:boolean = false;
          let icoSt:string = '';
          let nightSufix:string = '';
          console.log(hours);
          if (hours >= 21 || hours <=7) {
            nightSufix = '-night';
          }
          if (post.cloudcover[index] >= 25) {
            cloud_int = 1;
            
          } 
          if (post.cloudcover[index] >= 60) {
            cloud_int = 2;
            
          }
          if (post.rain[index] > 0) {
            rain_bool = true;
          }
          if (post.snowfall[index] > 0) {
            snow_bool = true;
          }
          switch (true) {
            case(rain_bool):
              switch (true) {
                  case (cloud_int == 2):
                    icoSt = 'background-image: url(/assets/rain.png)';
                    break;
                  default:
                    icoSt = `background-image: url(/assets/clear-rain${nightSufix}.png)`;
                    break;
              } 
              break;
              case(snow_bool):
              switch (true) {
                  case (cloud_int == 2):
                    icoSt = 'background-image: url(/assets/snow.png)';
                    break;
                  default:
                    icoSt = `background-image: url(/assets/clear-snow${nightSufix}.png)`;
                    break;
              } 
              break;  
            case (cloud_int == 2):
              icoSt = 'background-image: url(/assets/cloud.png)';
              break;
            case (cloud_int == 1):
              icoSt = `background-image: url(/assets/clear-cloud${nightSufix}.png)`;
              break;
            default:
              icoSt = `background-image: url(/assets/clear${nightSufix}.png); background-size: 80%;`;
              break
          }
          
          this.table_array_class[index_th] = { temp: post.temperature_2m[index], rain: post.precipitation[index], cloud: post.cloudcover[index], windDir: indWindDir, windSpeed: post.windspeed_10m[index], iconStyle: icoSt };
          console.log(icoSt);
          index_th++
        }

        index++;
      }

      index = 0;
      for (let item of post.temperature_2m) {
        data_array[index].push(item);
        index++;
      }

      index = 0;
      for (let item of post.relativehumidity_2m) {
        let limit = humidity_values.length;
        if (index == limit) {
          break;
        } else {
          humidity_values[index].push(item);
        }
        index++;
      }

      index = 0;
      for (let item of post.surface_pressure) {
        let limit = humidity_values.length;
        if (index == limit) {
          break;
        } else {
          pressure_values[index].push(Math.round(item / 1.333));
        }
        index++;
      }
      index = 0;
      for (let item of post.windspeed_10m) {
        let limit = humidity_values.length;
        if (index == limit) {
          break;
        } else {
          wind_values[index].push(item);
        }
        index++;
      }
      index = 0;
      for (let item of post.winddirection_10m) {
        let limit = humidity_values.length;
        if (index == limit) {
          break;
        } else {
          wind_direction_value[index].push(item);
        }
        index++;
      }
      let t_unit_string = '';
      if (t_unit) {
        t_unit_string = " °F";

      } else {
        t_unit_string = " °C";
      }
      this.chartOptions.yAxis.title.text = `Temperature${t_unit_string}`;
      this.chartOptions.tooltip.valueSuffix = t_unit_string

      this.chartOptions.xAxis.plotLines[0].value = now;
      this.chartOptions.series[0].data = data_array;
      this.chartOptions.series[0].name = country;
      this.chartOptions.title.text = title;
      this.chartOptions.annotations = [{
        labelOptions: {
          backgroundColor: 'rgba(255,255,255,0.5)',
          verticalAlign: 'top',
          x: 120
        },
        labels: [{
          point: { xAxis: 0, yAxis: 0, x: now, y: temperature_current },
          text: `Local time: ${new Date(now).toUTCString()} <br/> Temperature: ${temperature_current}${t_unit_string}`
        }]
      }];

      this.humidity_chartOptions_area.xAxis.plotLines[0].value = now;
      this.humidity_chartOptions_area.series[0].data = humidity_values;
      this.humidity_chartOptions_area.annotations = [{
        labelOptions: {
          backgroundColor: 'rgba(255,255,255,0.5)',
          verticalAlign: 'top',
          x: 50,
          y: -12
        },
        labels: [{
          point: { xAxis: 0, yAxis: 0, x: now, y: humidity_current },
          text: `Humidity: ${humidity_current} %`
        }]
      }];

      this.pressure_chartOptions_area.xAxis.plotLines[0].value = now;
      this.pressure_chartOptions_area.series[0].data = pressure_values;
      this.pressure_chartOptions_area.annotations = [{
        labelOptions: {
          backgroundColor: 'rgba(255,255,255,0.5)',
          verticalAlign: 'top',
          x: 65,
          y: -12
        },
        labels: [{
          point: { xAxis: 0, yAxis: 0, x: now, y: pressure_curent },
          text: `Pressure: ${pressure_curent} mm Hg`
        }]
      }];
      this.wind_chartOptions_area.xAxis.plotLines[0].value = now;
      this.wind_chartOptions_area.series[0].data = wind_values;
      this.wind_chartOptions_gauge.series[0].data = [wind_current_direction];
      this.wind_chartOptions_gauge.series[1].data = [wind_current_speed];
      this.wind_chartOptions_area.annotations = [{
        labelOptions: {
          backgroundColor: 'rgba(255,255,255,0.5)',
          verticalAlign: 'top',
          x: 55,
          y: -20
        },
        labels: [{
          point: { xAxis: 0, yAxis: 0, x: now, y: wind_current_speed },
          text: `Speed: ${wind_current_speed} m/s <br/> Direction ${wind_current_direction} °`
        }]
      }];

      this.humidity_chart_gauge = Highcharts.chart('container-humidity-chart', this.humidity_chartOptions_area);
      this.pressure_chart_area = Highcharts.chart('container-pressure-chart', this.pressure_chartOptions_area);
      this.wind_chart_area = Highcharts.chart('container-wind-chart', this.wind_chartOptions_area);
      this.highcharts = Highcharts.chart('container-chart', this.chartOptions);
      let viewportOffset = document.body.getElementsByClassName('container-panel')[0].getBoundingClientRect();
      this.check_type(this.selectedType);
      console.log(viewportOffset.top)
      window.scrollBy({
        left: 0,
        top: viewportOffset.top,
        behavior: 'smooth'
      });
    },
      error => {
        this._snackBar.open('Sorry, no data', 'Ok');
      }
    );
  }

  calc_wind_dir(dir: number) {
    let result: string;
    switch (true) {
      case (dir < 23):
        result = "↑N"
        break;
      case (dir < 68):
        result = "↗NE"
        break;
      case (dir < 113):
        result = "→E"

        break;
      case (dir < 158):
        result = "↘SE"

        break;
      case (dir < 203):
        result = "↓S"

        break;
      case (dir < 248):
        result = "↙SW"

        break;
      case (dir < 293):
        result = "←W"

        break;
      case (dir < 338):
        result = "↖NW"
        break;
      default:
        result = "↑N"
        break;
    }
    return result;
  }
  city_selected(value: any) {
    country_name = value.name;
    country_code = value.country;
    this.getUpToData(country_code, country_name, this.selected_unit_celsius)
  }

  Submit_by_params(lat: string, lon: string) {
    this.RouteLat = Number(lat);
    this.RouteLon = Number(lon);
    this.get_forecast(lat, lon, '', this.selected_unit_celsius);
  }

  Check_value(input: any, tag: number) {
    let min;
    let max;

    if (tag == 1) {
      min = -90;
      max = 90;
    }
    else {
      min = -180;
      max = 180;
    }
    if (input.value == "") {
      input.value = 0;
    }
    if (input.value >= min && input.value <= max) {
      return;
    } else {
      this._snackBar.open(`${input.name} must be in ${input.placeholder} but got ${input.value}`, 'Ok');
      input.value = 0;
    }
  }

  change_method(e: any, default_method: any, modify_method: any) {

    if (default_method.id == "enabled") {
      this.menu_text = 'Query by city';
      default_method.id = "disabled";
      modify_method.id = "enabled";
    } else {
      this.menu_text = 'Extended query by parameters';
      modify_method.id = "disabled";
      default_method.id = "enabled";
    }

  }
  change_unit(e: any, default_method: any, lat: any, lon: any) {

    if (e == "C") {
      this.selected_unit_celsius = false;
    } else { this.selected_unit_celsius = true }
    if (default_method.id == "enabled") {
      this.getUpToData(country_code, country_name, this.selected_unit_celsius)
    } else {
      if (this.check_box) {
        this.getUpToData(country_code, country_name, this.selected_unit_celsius)
      } else {
        this.get_forecast(lat, lon, '', this.selected_unit_celsius);
      }
    }
  }
  get_country() {
    this.service.getCounryCSV().subscribe(data => {

      const list = data.split('\n');
      let index = 0;
      list.slice(1).forEach(element => {
        if (element != '') {
          element = element.replace('\r', '');
          let row = element.split(",");
          this.countries_list[index] = ([row[0]]);
          this.countries_list[index].push(row[1]);
          index++;
        }
      });
    })

  }
  find_cities(country: any) {
    this.service.getCityJson().subscribe(Response => {
      let items = JSON.stringify(Response);
      let index = 0;
      this.cities_list = [];
      for (let item of JSON.parse(items)) {
        if (item.country == country[1]) {
          this.cities_list[index] = ([item.name]);
          this.cities_list[index].push(item.country)
          index++;
        }
      }
      this.cities_list = this.cities_list.reverse();
    })
  }

  async switch_country_select(e: any, country: any, city: any) {

    if (e.checked) {
      let response: any = await this.openDialog();
      if (response) {
        country.disabled = false;
        city.disabled = false;
      } else { this.check_box = false }
    } else {
      country.disabled = true;
      city.disabled = true;
    }
  }
  openDialog(): Promise<void> {

    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px'
    });

    return dialogRef.afterClosed().toPromise().then(result => {
      return Promise.resolve(result);
    });

  }
  change_chart_type(e: any) {
    this.selectedType = e;
    this.check_type(this.selectedType);
  }
  check_type(chart_type: any) {

    if (chart_type == 'column') {
      this.highcharts.update({ chart: { type: chart_type }, plotOptions: { series: { threshold: 0 } } })
    }
    else
      this.highcharts.update({ chart: { type: chart_type }, plotOptions: { series: { threshold: -Infinity } } });
  }
  change_wind_chart() {
    if (!this.change_wind_check) {
      this.wind_chart_area = Highcharts.chart('container-wind-chart', this.wind_chartOptions_area);
    } else {
      this.wind_chart_gauge = Highcharts.chart('container-wind-chart', this.wind_chartOptions_gauge);
    }
    this.change_wind_check = !this.change_wind_check;
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
  onYesClick(): void {
    this.dialogRef.close(true);
  }
}