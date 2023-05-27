import { Component, OnInit } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexPlotOptions, ApexResponsive, ApexXAxis, ApexLegend, ApexFill } from 'ng-apexcharts';

@Component({
  selector: 'app-overview-chart',
  templateUrl: './overview-chart.component.html',
  styleUrls: ['./overview-chart.component.css']
})




export class OverviewChartComponent {
  // chart 1
  chartSeries: ApexAxisChartSeries = [
    
    {
      name: "appointment",
     data: [60, 50, 76, 72, 60, 70,20, 35, 49, 60, 30, 40]
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



  constructor() {
  }

  ngOnInit(): void {
  }
}
