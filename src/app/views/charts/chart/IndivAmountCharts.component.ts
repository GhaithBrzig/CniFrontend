import { Component, OnInit, ViewChild } from '@angular/core';
import { CsvService } from "../../../core/services/csv.service";
import { CsvFile } from "../../../core/model/csvfile";
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries ;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-chart',
  templateUrl: './IndivAmountCharts.component.html',
  styleUrls: ['./IndivAmountCharts.component.scss']
})
export class IndivAmountChartsComponent implements OnInit {
  public dataCsv: CsvFile[];
  moisData : any;
  montantIndData: any;
  yearData : any;
  montantIndyearData: any;
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions!: Partial<ChartOptions> | any;
  public chartLineOptions!: Partial<ChartOptions> | any;
  constructor(private csvSer: CsvService) {}



  ngOnInit(): void {
    this.csvSer.getAll().subscribe({
      next: (params) => {
        this.dataCsv = params;
        this.moisData = this.dataCsv.map(item => item.mois);
        this.montantIndData = this.dataCsv.map(item => item.montant_ind);
        this.yearData = this.dataCsv.map(item => item.annee);

        // Calculate the sum of montantInd by month
        const yearSums :any = {};
        for (let i = 0; i < this.yearData.length; i++) {
          const year = this.yearData[i];
          const montantY = this.montantIndData[i];

          if (yearSums[year]) {
            yearSums[year] += montantY;
          } else {
            yearSums[year] = montantY;
          }
        }

        // Get the unique months and their sums
        const uniqueYears = Object.keys(yearSums);
        const sumsY = uniqueYears.map(year => yearSums[year]);
        const roundedSumsY = sumsY.map(sum => Math.round(sum * 100) / 100);

        // Calculate the sum of montantInd by month
        const monthSums :any = {};
        for (let i = 0; i < this.moisData.length; i++) {
          const month = this.moisData[i];
          const montant = this.montantIndData[i];

          if (monthSums[month]) {
            monthSums[month] += montant;
          } else {
            monthSums[month] = montant;
          }
        }

        // Get the unique months and their sums
        const uniqueMonths = Object.keys(monthSums);
        const sums = uniqueMonths.map(month => monthSums[month]);

        // Round the sums to 2 decimal places
        const roundedSums = sums.map(sum => Math.round(sum * 100) / 100);

        this.chartOptions = {
          series: [
            {
              name: "Montant_ind",
              data: roundedSums
            }
          ],
          chart: {
            height: 350,
            type: "bar",
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: "straight"
          },
          title: {
            text: "Sum of individual amount by Month",
            align: "left"
          },
          grid: {
            row: {
              colors: ["#f3f3f3", "transparent"],
              opacity: 0.5
            }
          },
          xaxis: {
            categories: uniqueMonths
          }
        };

        this.chartLineOptions = {
          series: [
            {
              name: "Montant_ind",
              data: roundedSumsY,
              color: "#e3b819"
            }
          ],
          chart: {
            height: 350,
            type: "line",
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: "straight"
          },
          title: {
            text: "Sum of individual amount by Year",
            align: "left"
          },
          grid: {
            row: {
              colors: ["#f3f3f3", "transparent"],
              opacity: 0.5
            }
          },
          xaxis: {
            categories: uniqueYears
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
