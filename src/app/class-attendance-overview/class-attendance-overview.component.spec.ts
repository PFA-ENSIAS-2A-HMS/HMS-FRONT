import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ApexChart,
  ApexAxisChartSeries,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexGrid,
  NgApexchartsModule
} from "ng-apexcharts";
import { ClassAttendanceOverviewComponent } from './class-attendance-overview.component';
import * as ApexCharts from 'apexcharts';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverviewChartComponent } from '../overview-chart/overview-chart.component';
describe('ClassAttendanceOverviewComponent', () => {
  let component: ClassAttendanceOverviewComponent;
  let fixture: ComponentFixture<ClassAttendanceOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassAttendanceOverviewComponent,NavbarComponent,
        SidebarComponent, OverviewChartComponent], 
       imports: [RouterTestingModule, 
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        ReactiveFormsModule,
        FormsModule,
        NgApexchartsModule

      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassAttendanceOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have chart series data', () => {
    expect(component.chartSeries).toBeDefined();
    expect(component.chartSeries.length).toBeGreaterThan(0);
  });

  it('should have chart details configured', () => {
    expect(component.chartDetails).toBeDefined();
    expect(component.chartDetails.type).toBe('bar');
    expect(component.chartDetails.height).toBe(350);
  });

});
