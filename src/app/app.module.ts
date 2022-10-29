import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Chart } from './chart/chart.component';
import { DialogOverviewExampleDialog } from './chart/chart.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HighchartsChartModule } from 'highcharts-angular';
import { BottomComponent } from './bottom/bottom.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { PostService } from './services/post.service';
import { MapComponent } from './map/map.component';
import { HeaderComponent } from './header/header.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ChartSettingsComponent } from './chart/chart-settings/chart-settings.component';
import { ChartsPageComponent } from './charts-page/charts-page.component';

@NgModule({

  declarations: [
    AppComponent,
    Chart,
    BottomComponent,
    DialogOverviewExampleDialog,
    MapComponent,
    HeaderComponent,
    ChartSettingsComponent,
    ChartsPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HighchartsChartModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatCheckboxModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatSnackBarModule
  ],
  providers: [PostService, Chart],
  bootstrap: [AppComponent]
})
export class AppModule {

}
