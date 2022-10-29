import { Component, OnInit } from '@angular/core';
import { Chart }  from '../chart.component';


@Component({
  selector: 'app-chart-settings',
  templateUrl: './chart-settings.component.html',
  styleUrls: ['./chart-settings.component.css']
})
export class ChartSettingsComponent implements OnInit {
  constructor(public chart : Chart) { }

  ngOnInit(): void {
  }

}
