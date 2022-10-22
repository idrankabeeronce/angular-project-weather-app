import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
declare var require: any;
require('highcharts/highcharts-more')(Highcharts);
import { tap } from 'rxjs';
import { PostService } from '../services/post.service';
import { Observable, of, pipe } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


let country_name: string;
let country_code: string;



@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class Chart implements OnInit {
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

  humidity_chart_gauge: any;
  pressure_chart_gauge: any;
  wind_chart_gauge: any;

  humidity_chart_area: any;
  pressure_chart_area: any;
  wind_chart_area: any;
  change_wind_check = true;
  array_of_null: any[] = [];
  highcharts: any;

  selectedType_form = new FormControl('spline');
  selectedType: string = 'spline';
  longitude: number = 0;
  latitude: number = 0;
  button_model: any;
  menu_text: string = 'Query by city';
  selected_temp = new FormControl('C');
  selected_unit_celsius = false;
  countries_list: any[] = [[], []];
  cities_list: any[] = [[], []];
  check_box = false;

  humidity_chartOptions_area: any = {
    chart: {
      type: 'area',
      zoomType: 'x',
      backgroundColor: 'transparent',
      style: {
        fontFamily: 'Roboto, "Helvetica Neue", sans-serif',
        fontWeight: 'bold'
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
      text: "Humidity",
      y: 4
    },
    yAxis: {
      max: 100,
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
        color: 'rgba(20,20,20,.5)',
        width: 2
      },
      plotLines: [{
        zIndex: 9,
        color: '#14143d', // Red
        width: 2,
        value: 0 // Position, you'll have to translate this to the values on your x axis
      }],
      labels: {
        enabled: false
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
      area: {
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
      type: 'area',
      zoomType: 'x',
      backgroundColor: 'transparent',
      style: {
        fontFamily: 'Roboto, "Helvetica Neue", sans-serif',
        fontWeight: 'bold'
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
      text: "Pressure",
      y: 4
    },
    yAxis: {
      title: {
        text: ""
      },
      labels: {
        enabled: true
      },
      //minRange: 1
    },
    xAxis: {
      type: "datetime",

      crosshair: {
        color: 'rgba(20,20,20,.5)',
        width: 2
      },
      plotLines: [{
        zIndex: 9,
        color: '#14143d', // Red
        width: 2,
        value: 0 // Position, you'll have to translate this to the values on your x axis
      }],
      labels: {
        enabled: false
      }
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
      area: {
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
      type: 'area',
      zoomType: 'x',
      backgroundColor: 'transparent',
      style: {
        fontFamily: 'Roboto, "Helvetica Neue", sans-serif',
        fontWeight: 'bold'
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
      text: "Wind speed",
      y: 4
    },
    yAxis: {
      title: {
        text: ""
      },
      labels: {
        enabled: true
      },

    },
    xAxis: {
      type: "datetime",
      crosshair: {
        color: 'rgba(20,20,20,.5)',
        width: 2
      },
      plotLines: [{
        zIndex: 9,
        color: '#14143d',
        width: 2,
        value: 0
      }],
      labels: {
        enabled: false
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
        /*
        zones: [
          {
            value: 0,
            
            color: {
              pattern: {
                image: 'https://www.svgrepo.com/show/175041/arrow.svg',
                aspectRatio: 1.3
            }
          }
            //https://www.svgrepo.com/show/175041/arrow.svg
          },
          {
            value: 100,
            color: {
              pattern: {
                image: 'https://www.svgrepo.com/show/175041/arrow.svg',
                aspectRatio: 1.3
            }
          }
          },
          {
            value: 200,            
            color: {
              pattern: {
                image: 'https://www.svgrepo.com/show/175041/arrow.svg',
                aspectRatio: 1.3
            }
          }
          },
          {
            
            color:{
              pattern: {
                image: 'https://www.svgrepo.com/show/175041/arrow.svg',
                aspectRatio: 1.3
            }
          }
          }]*/
      }
    ],
    plotOptions: {
      area: {
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

  //this.pressure_chartOptions_area.series[0].name ='Pressure';
  //this.wind_chartOptions_area.series[0].name ='Wind speed';
  chartOptions: any = {
    chart: {
      type: this.selectedType,
      zoomType: 'x',
      backgroundColor: 'transparent',
      style: {
        fontFamily: 'Roboto, "Helvetica Neue", sans-serif',
        fontWeight: 'bold'
      }
    },
    credits: {
      enabled: false
    },
    data: {
      dateFormat: 'dd/mm/YYYY'
    },
    title: {
      align: 'left',
      text: "",
      y: 4
    },
    subtitle: {
      align: 'left',
      text: "Source: Open-Meteo.com",
      y: 24
    },
    xAxis: {
      lineColor: 'rgba(20,20,20,.5)',
      type: "datetime",
      crosshair: {
        color: 'rgba(20,20,20,.5)',
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

      line: {

        dataLabels: {
          enabled: true
        }
      },
      series: {

        threshold: 0,
        marker: {
          enabled: false,
        },
        zones: [
          {
            value: -50,
            color: '#2975E6'
          }, {
            value: -40,
            color: '#29A1E6'
          }, {
            value: -30,
            color: '#29C1E6'
          }, {
            value: -20,
            color: '#29E6CD'
          }, {
            value: -10,
            color: '#1FD882'
          }, {
            value: -5,
            color: '#1EDA50'
          }, {
            value: 0,
            color: '#7AE446'
          }, {
            value: 5,
            color: '#9FE446'
          }, {
            value: 10,
            color: '#F0E218'
          }, {
            value: 20,
            color: '#F0AF18'
          }, {
            value: 30,
            color: '#EFA119'
          }, {
            value: 40,
            color: '#F07D18'
          }, {
            color: '#F04B18'
          }]
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
        fontWeight: 'bold'
      },

    },
    credits: {
      enabled: false
    },
    title: {
      align: 'left',
      text: "Wind speed and direction",
      y: 4
    },
    pane: {
      startAngle: 0,
      endAngle: 360,
      background: null,
      center: ['50%', '50%'],
      size: '100%',
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
    yAxis: {
      lineWidth: 0,
      min: 0,
      max: 360,
      minorTicks: false,
      tickColor: 'rgba(20,20,20,.3)',
      tickPixelInterval: 3,
      tickPosition: 'inside',
      tickLength: 10,
      tickWidth: 2,
      labels: {
        useHTML: true,
        enabled: true,
        step: 90
      }
    }
  };
  constructor(public service: PostService, public dialog: MatDialog) {

  }


  ngOnInit(): void {
    this.get_country();
    country_name = 'Moscow';
    country_code = 'RU';
    this.getUpToData(country_code, country_name, this.selected_unit_celsius);
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
        alert("No Such country");
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
        title = `A weather forecast for a week in ${country}`;
      } else {
        title = `A weather forecast for a week by latitude: ${latitude} and longitude: ${longitude}`
      }

      posts = Response;
      post = posts.hourly;

      now = Date.parse(today) + posts.utc_offset_seconds * 1000;
      let now_hour = Math.round(now / p) * p;

      let index = 0;
      for (let item of post.time) {
        data_array[index] = [(item + posts.utc_offset_seconds) * 1000];
        humidity_values[index] = [(item + posts.utc_offset_seconds) * 1000];
        pressure_values[index] = [(item + posts.utc_offset_seconds) * 1000];
        wind_values[index] = [(item + posts.utc_offset_seconds) * 1000];
        wind_direction_value[index] = [(item + posts.utc_offset_seconds) * 1000];
        if (Number(data_array[index][0]) == (now_hour)) {
          humidity_current = post.relativehumidity_2m[index];
          pressure_curent = post.surface_pressure[index];
          wind_current_speed = post.windspeed_10m[index];
          wind_current_direction = post.winddirection_10m[index];
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
        humidity_values[index].push(item);
        index++;
      }

      index = 0;
      for (let item of post.surface_pressure) {
        pressure_values[index].push(Math.round(item / 1.333));
        index++;
      }
      index = 0;
      for (let item of post.windspeed_10m) {
        wind_values[index].push(item);
        index++;
      }
      index = 0;
      for (let item of post.winddirection_10m) {
        wind_direction_value[index].push(item);
        index++;
      }

      for (let index = 0; index < 360; index++) {
        switch (index) {
          case 0: this.array_of_null[index] = 'N';
          break;
          case 90: this.array_of_null[index] = 'E';
          break;
          case 180: this.array_of_null[index] = 'S';
          break;
          case 270: this.array_of_null[index] = 'W';
          break;
          default: this.array_of_null[index] = index;
        }
        
      }

      if (t_unit) {
        this.chartOptions.yAxis.title.text = "Temperature °F";
        this.chartOptions.tooltip.valueSuffix = " °F"
        this.chartOptions.plotOptions.series.zones = [{ value: -58, color: '#2975E6' }, { value: -40, color: '#29A1E6' }, { value: -22, color: '#29C1E6' }, { value: -4, color: '#29E6CD' }, { value: 14, color: '#1FD882' }, { value: 23, color: '#1EDA50' }, { value: 32, color: '#7AE446' }, { value: 41, color: '#9FE446' }, { value: 50, color: '#F0E218' }, { value: 68, color: '#F0AF18' }, { value: 86, color: '#EFA119' }, { value: 104, color: '#F07D18' }, { color: '#F04B18' }];
        // [-58, -40, -22, -4, 14, 23, 32, 41, 50, 68, 86, 104] 
      } else {
        this.chartOptions.yAxis.title.text = "Temperature °C";
        this.chartOptions.tooltip.valueSuffix = " °C"
        this.chartOptions.plotOptions.series.zones = [{ value: -50, color: '#2975E6' }, { value: -40, color: '#29A1E6' }, { value: -30, color: '#29C1E6' }, { value: -20, color: '#29E6CD' }, { value: -10, color: '#1FD882' }, { value: -5, color: '#1EDA50' }, { value: 0, color: '#7AE446' }, { value: 5, color: '#9FE446' }, { value: 10, color: '#F0E218' }, { value: 20, color: '#F0AF18' }, { value: 30, color: '#EFA119' }, { value: 40, color: '#F07D18' }, { color: '#F04B18' }];
      }

      this.chartOptions.xAxis.plotLines[0].value = now;
      this.chartOptions.series[0].data = data_array;
      this.chartOptions.series[0].name = country;
      this.chartOptions.title.text = title;

      this.humidity_chartOptions_area.xAxis.plotLines[0].value = now;
      this.humidity_chartOptions_area.series[0].data = humidity_values;


      this.pressure_chartOptions_area.xAxis.plotLines[0].value = now;
      this.pressure_chartOptions_area.series[0].data = pressure_values;

      this.wind_chartOptions_area.xAxis.plotLines[0].value = now;
      this.wind_chartOptions_area.series[0].data = wind_values;
      this.wind_chartOptions_gauge.series[0].data = [wind_current_direction];
      this.wind_chartOptions_gauge.series[1].data = [wind_current_speed];
      this.wind_chartOptions_gauge.yAxis.categories = this.array_of_null;

      this.humidity_chart_gauge = Highcharts.chart('container-humidity-chart', this.humidity_chartOptions_area);
      this.pressure_chart_area = Highcharts.chart('container-pressure-chart', this.pressure_chartOptions_area);
      this.wind_chart_area = Highcharts.chart('container-wind-chart', this.wind_chartOptions_area);
      this.highcharts = Highcharts.chart('container-chart', this.chartOptions);
      this.check_type(this.selectedType);
    });
  }


  city_selected(value = []) {
    console.log(value);
    country_name = value[0];
    country_code = value[1];
    this.getUpToData(country_code, country_name, this.selected_unit_celsius)
  }

  Submit_by_params(lat: string, lon: string) {
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
      alert(`${input.name} must be in ${input.placeholder} but got ${input.value}`)
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
    console.log(e);
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
      console.log(this.countries_list);
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
    if (chart_type == 'area')
      this.highcharts.update({ chart: { type: chart_type }, plotOptions: { series: { threshold: -Infinity } } })
    else
      this.highcharts.update({ chart: { type: chart_type }, plotOptions: { series: { threshold: 0 } } });
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
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>
  ) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
  onYesClick(): void {
    this.dialogRef.close(true);
  }
}