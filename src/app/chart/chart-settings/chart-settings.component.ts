import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Chart } from '../chart.component';


@Component({
  selector: 'app-chart-settings',
  templateUrl: './chart-settings.component.html',
  styleUrls: ['./chart-settings.component.css']
})
export class ChartSettingsComponent implements OnInit {
  constructor(public service: PostService, public chart: Chart) { }

  ngOnInit(): void {
    this.get_country();
  }
  get_country() {
    this.service.getCounryCSV().subscribe(data => {

      const list = data.split('\n');
      let index = 0;
      list.slice(1).forEach(element => {
        if (element != '') {
          element = element.replace('\r', '');
          let row = element.split(",");
          this.chart.countries_list[index] = ([row[0]]);
          this.chart.countries_list[index].push(row[1]);
          index++;
        }
      });
      console.log(this.chart.countries_list);
    })

  }
  find_cities(country: any) {
    this.service.getCityJson().subscribe(Response => {
      let items = JSON.stringify(Response);
      let index = 0;
      this.chart.cities_list = [];
      for (let item of JSON.parse(items)) {
        if (item.country == country[1]) {
          this.chart.cities_list[index] = ([item.name]);
          this.chart.cities_list[index].push(item.country)
          index++;
        }
      }
      this.chart.cities_list = this.chart.cities_list.reverse();
    })
  }
  city_selected(value: any) {
    let country_name = '';
    let country_code = '';
    if (value.name) {
      country_name = value.name;
      country_code = value.country;
    } else {
      country_name = value[0];
      country_code = value[1];
    }
    console.log(value);
    this.chart.getUpToData(country_code, country_name, this.chart.selected_unit_celsius)
  }
}
