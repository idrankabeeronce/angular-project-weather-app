import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChartSettingsComponent } from './chart-settings.component';
import { Chart } from '../chart.component';
import { MatDialogModule} from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { RouterTestingModule } from "@angular/router/testing";
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('ChartSettingsComponent', () => {
  let component: ChartSettingsComponent;
  let fixture: ComponentFixture<ChartSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, MatDialogModule,MatSnackBarModule, MatMenuModule],
      declarations: [ ChartSettingsComponent, Chart ],
      providers: [Chart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
