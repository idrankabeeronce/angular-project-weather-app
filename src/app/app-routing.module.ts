import { NgModule, Injectable, } from '@angular/core';
import { RouterModule, Routes, Resolve } from '@angular/router';
import { Chart } from './chart/chart.component';
import { ChartsPageComponent } from './charts-page/charts-page.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [
  { path: '', title: 'World map', component: MapComponent, 
  children: [
    {
      path: 'weather-local',
      component: Chart,
    },
  ]
  },
  { path: 'local', component: Chart },
  { path: 'weather-forecast', title: 'Weather Forecast', component: ChartsPageComponent},
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
@Injectable({ providedIn: 'root' })
export class AppRoutingModule implements Resolve<string> {
  resolve() {
    return Promise.resolve('child a');
  }
}
