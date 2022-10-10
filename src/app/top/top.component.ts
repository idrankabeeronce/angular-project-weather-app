import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';


Highcharts.setOptions({
  title: {
    text: "Monthly Average Temperature"
  },
  subtitle: {
    text: "Source: WorldClimate.com"
  },
  xAxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  },
  yAxis: {
    title: {
      text: "Temperature °C"
    }
  },
  tooltip: {
    valueSuffix: " °C"
  }
});

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {
  highcharts: any;
  selectedType: string = 'line';

  chartOptions: any = {
    chart: {
      type: this.selectedType
    },
    series: [
      {
        name: 'Tokyo',
        data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
      },
      {
        name: 'govno',
        data: [2.0, 3.0]
      }
    ]
  };

  constructor() {

  }

  ngOnInit(): void {
    this.highcharts = Highcharts;
  }

}
