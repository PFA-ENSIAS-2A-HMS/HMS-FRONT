import { Component, ViewChild } from "@angular/core";
import {
  ApexChart,
  ApexAxisChartSeries,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexGrid
} from "ng-apexcharts";

type ApexXAxis = {
  type?: "category" | "datetime" | "numeric";
  categories?: any;
  labels?: {
    style?: {
      colors?: string | string[];
      fontSize?: string;
    };
  };
};

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  colors: string[];
  legend: ApexLegend;
};

@Component({
  selector: 'app-class-attendance-overview',
  templateUrl: './class-attendance-overview.component.html',
  styleUrls: ['./class-attendance-overview.component.css']
}) 
export class ClassAttendanceOverviewComponent {
  @ViewChild("chart") chart: any;
 
  chartSeries: ApexAxisChartSeries =[
    {
      name: "Number of Absences",
      data: [17, 3, 8, 7, 5, 4, 1, 2]
    }
  ];
  chartDetails: ApexChart = {
    height: 350,
    type: "bar",
    events: {
      click: function(chart, w, e) {
        // console.log(chart, w, e)
      }
    }
  };

  chartDataLabels: ApexDataLabels = {};
  colors: string[] =  [
    "#008FFB",
    "#00E396",
    "#FEB019",
    "#FF4560",
    "#775DD0",
    "#546E7A",
    "#26a69a",
    "#D10CE8"
  ];
  chartPlotOptions: ApexPlotOptions = {
    bar: {
      columnWidth: "45%",
      distributed: true
    }
  };
  plotOptions: ApexPlotOptions =  {
    bar: {
      columnWidth: "45%",
      distributed: true
    }
  };
  dataLabels: ApexDataLabels=   {
    enabled: false
  };
  legend: ApexLegend = {
    show: false
  };
  grid: ApexGrid=  {
    show: false
  };
  xaxis: ApexXAxis  = {
    categories: [
      "GL",
      "2IA",
      "IDSIT",
      "BI&A",
      "SSE",
      "2SCL",
      "GD",
      "SSI"
    ],
    labels: {
      style: {
        colors: [
          "#008FFB",
          "#00E396",
          "#FEB019",
          "#FF4560",
          "#775DD0",
          "#546E7A",
          "#26a69a",
          "#D10CE8"
        ],
        fontSize: "12px"
      }
    }
  };
  constructor() {
   
  }
}
