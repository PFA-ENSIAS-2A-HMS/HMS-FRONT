import { Component, OnInit } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexPlotOptions, ApexResponsive, ApexXAxis, ApexLegend, ApexFill } from 'ng-apexcharts';

import { OverviewChartComponent } from '../overview-chart/overview-chart.component';

import { UserService } from '../services/user.service';
import { DashboardService } from '../services/dashboard.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers : [UserService]
})
export class MainComponent {

  user: any;
  dashboardInfo : any;

  constructor(private userService : UserService,
    private dashboardService  : DashboardService) {
      this.getDashboardInfo(1);
     }

  ngOnInit() {
    const userId = localStorage.getItem('id') || 'unkonwn';
    console.log(userId);
    this.userService.getAdminById(userId).subscribe((user) => {
      this.user = user;
    });
  }
  // chart 1
  chartSeries: ApexAxisChartSeries = [
    
    {
      name: "appointments",
      data: [13, 23, 20, 8, 13, 27,44, 55, 41, 67, 22, 43]
    }
  ];

  chartDetails: ApexChart = {
    type: 'bar',
    height: 350,
    stacked: true,
    toolbar: {
      show: true
    },
    zoom: {
      enabled: true
    }
  };

  chartDataLabels: ApexDataLabels = {};

  chartPlotOptions: ApexPlotOptions = {
    bar: {
      horizontal: false
    }
  };

  chartResponsive: ApexResponsive[] = [
    {
      breakpoint: 480,
      options: {
        legend: {
          position: "bottom",
          offsetX: -10,
          offsetY: 0
        }
      }
    }
  ];

  chartXAxis: ApexXAxis = {
    type: "category",
    categories: [
      "01/2023",
      "02/2023",
      "03/2023",
      "04/2023",
      "05/2023",
      "06/2023",
      "07/2023",
      "08/2023",
      "09/2023",
      "10/2023",
      "11/2023",
      "12/2023"
    ]
  };

  chartLegend: ApexLegend = {
    position: "right",
    offsetY: 40
  };

  chartFill: ApexFill = {
    opacity: 1
  };

  getDashboardInfo(hospitalId : number): void {
    this.dashboardService.getDashboardInfo(hospitalId)
      .subscribe(
        (data: any) => {
          this.dashboardInfo = data;
          },
        (error) => {
          console.error(error);
        }
      );
  }

 
}
