import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { reduce } from 'rxjs';

var highcharts: any;
highcharts = Highcharts;



Highcharts.setOptions({
  chart: {
    backgroundColor: 'transparent'
  },
  title: {
    text: "A week weather forecast"
  },
  data: {
    dateFormat: 'dd/mm/YYYY'
  },
  subtitle: {
    text: "Source: WorldClimate.com"
  },
  xAxis: {
    type: "datetime"
  },
  yAxis: {
    title: {
      text: "Temperature °C"
    }
  },

  tooltip: {
    valueSuffix: " °C"
  },
  plotOptions: {
    line: {
      dataLabels: {
        enabled: true
      }
    },
    series: {
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
      },{
        color: '#F04B18'
      }]
    }
  },

});

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {
  highcharts: any;
  selectedType: string = 'spline';

  chartOptions: any = {
    chart: {
      type: this.selectedType,

    },
    legend: {
      enabled: false
    },
    series: [
      {
        name: 'Tokyo',
        data: [[Date.UTC(2022, 10, 11),-100.2], [Date.UTC(2022, 10, 12), -26.9], [Date.UTC(2022, 10, 13), -44.5], [Date.UTC(2022, 10, 14), -14.5], [Date.UTC(2022, 10, 15), -8.2], [Date.UTC(2022, 10, 16), 0], [Date.UTC(2022, 10, 17), 36.2]]
      },
    ]
  };

  constructor() {

  }

  ngOnInit(): void {
    this.highcharts = Highcharts;
  }

}
