import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Chart } from './chart.component';
import { MatDialogModule} from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from "@angular/router/testing";

describe('Chart', () => {
  let component: Chart;
  let fixture: ComponentFixture<Chart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        HttpClientTestingModule,
        MatMenuModule,
        MatSnackBarModule,
        RouterTestingModule
      ],
      declarations: [ Chart ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Chart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
