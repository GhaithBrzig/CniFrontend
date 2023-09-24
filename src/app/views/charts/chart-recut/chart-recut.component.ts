import { Component, OnInit, ViewChild } from '@angular/core';
import { CsvService } from "../../../core/services/csv.service";
import { CsvFile } from "../../../core/model/csvfile";
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexFill,
  ApexYAxis,
  ApexTooltip,
  ApexTitleSubtitle,
  ApexXAxis
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  title: ApexTitleSubtitle;
  labels: string[];
  stroke: any; // ApexStroke;
  dataLabels: any; // ApexDataLabels;
  fill: ApexFill;
  tooltip: ApexTooltip;
};
@Component({
  selector: 'app-chart-recut',
  templateUrl: './chart-recut.component.html',
  styleUrls: ['./chart-recut.component.scss']
})
export class ChartRecutComponent implements OnInit {
  public dataCsv: CsvFile[];
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;
  public chartAreaOptions: Partial<ChartOptions> | any;
  constructor(private csvSer: CsvService) {}

  ngOnInit(): void {
    this.csvSer.getAll().subscribe({
      next: (params) => {
        this.dataCsv = params;

        // Group data by year and gender
        const groupedData = this.dataCsv.reduce((result:any, item: any) => {
          const year = item.annee;
          const gender = item.sexe === 1 ? 'Male' : 'Female';

          if (!result[year]) {
            result[year] = { Male: 0, Female: 0 };
          }

          result[year][gender] += 1;

          return result;
        }, {});

        // Extract years and gender counts
        const years = Object.keys(groupedData);
        const maleCounts = years.map(year => groupedData[year].Male);
        const femaleCounts = years.map(year => groupedData[year].Female);




        // Group data by month and gender
        const groupedMData = this.dataCsv.reduce((result: any, item: any) => {
          const month = item.mois;
          const genderM = item.sexe === 1 ? 'Male' : 'Female';

          if (!result[month]) {
            result[month] = { Male: 0, Female: 0 };
          }

          result[month][genderM] += 1;

          return result;
        }, {});

// Extract months and gender counts
        const months = Object.keys(groupedMData);
        const maleMCounts = months.map(month => groupedMData[month].Male);
        const femaleMCounts = months.map(month => groupedMData[month].Female);


        this.chartOptions = {
          series: [
            {
              name: "Male",
              type: "column",
              data: maleCounts
            },
            {
              name: "Female",
              type: "line",
              data: femaleCounts,
              color: "#FF4560"
            }
          ],
          chart: {
            height: 350,
            type: "line"
          },
          stroke: {
            width: [0, 4]
          },
          title: {
            text: "Recruitment by Year"
          },
          dataLabels: {
            enabled: true,
            enabledOnSeries: [1]
          },
          labels: years,
          xaxis: {
            type: "category"
          },
          yaxis: {
            title: {
              text: "Number of Recruitments"
            }
          }
        };


        this.chartAreaOptions = {
          series: [
            {
              name: "Male",
              data: maleMCounts,
              color: "#008FFB" // Change the color for Male series
            },
            {
              name: "Female",
              data: femaleMCounts,
              color: "#FF4560" // Change the color for Female series
            }
          ],
          chart: {
            height: 350,
            type: "area"
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: "smooth"
          },
          xaxis: {
            type: "category",
            categories: months
          },
          tooltip: {
            x: {
              format: "dd/MM/yy HH:mm"
            }
          }
        };



      },
      error: (error) => {
        console.log('Error fetching data:', error);
        // Optionally display an error message to the user
      },
      complete: () => {
        console.log('complete');
      }
    })
  }

}
