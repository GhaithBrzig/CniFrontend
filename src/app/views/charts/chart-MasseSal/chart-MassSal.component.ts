import {Component, OnInit, ViewChild} from '@angular/core';
import {CsvService} from "../../../core/services/csv.service";
import {CsvFile} from "../../../core/model/csvfile";


import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexMarkers,
  ApexFill,
  ApexForecastDataPoints,
  ApexLegend
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  markers: ApexMarkers;
  colors: string[];
  fill: ApexFill;
  forecastDataPoints: ApexForecastDataPoints;
  legend: ApexLegend;
};
@Component({
  selector: 'app-chart-donut',
  templateUrl: './chart-MassSal.component.html',
  styleUrls: ['./chart-MassSal.component.scss']
})
export class ChartMassSalComponent implements OnInit {
  public dataCsv: CsvFile[];
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;
  public chartComboOptions: Partial<ChartOptions> | any;
  constructor(private csvSer: CsvService) {}


  ngOnInit(): void {
    this.csvSer.getAll().subscribe({
      next: (params) => {
        this.dataCsv = params;

        // Group data by year and calculate min and max of montant_ind_masse_salariale
        const groupedData = this.dataCsv.reduce((result:any, item:any) => {
          const year = item.annee;
          const montant = item.montant_ind_masse_salariale;

          if (!result[year]) {
            result[year] = { min: Number.MAX_VALUE, max: Number.MIN_VALUE };
          }

          if (montant < result[year].min) {
            result[year].min = montant;
          }

          if (montant > result[year].max) {
            result[year].max = montant;
          }

          return result;
        }, {});

        // Extract years and their min/max ranges
        const years = Object.keys(groupedData);
        const ranges = years.map(year => ({
          x: year,
          y: [groupedData[year].min, groupedData[year].max]
        }));





        const groupedGData = this.dataCsv.reduce((result: any, item: any) => {
          const year = item.annee;
          const gender = item.sexe === 1 ? 'Male' : 'Female';

          if (!result[year]) {
            result[year] = { Male: [], Female: [] };
          }

          result[year][gender].push(item.montant_ind_masse_salariale);

          return result;
        }, {});

// Extract years and gender data
        const yearsG = Object.keys(groupedGData);
        const maleData = yearsG.map(year => ({
          x: year,
          y: [Math.min(...groupedGData[year].Male), Math.max(...groupedGData[year].Male)]
        }));
        const femaleData = years.map(year => ({
          x: year,
          y: [Math.min(...groupedGData[year].Female), Math.max(...groupedGData[year].Female)]
        }));

        this.chartOptions = {
          series: [
            {
              name: "Mass Salariale",
              data: ranges
            }
          ],
          chart: {
            height: 350,
            type: "rangeArea"
          },
          stroke: {
            curve: "straight"
          },
          title: {
            text: "Yearly Mass Salariale Range"
          },
          markers: {
            hover: {
              sizeOffset: 5
            }
          },
          dataLabels: {
            enabled: false
          },
          yaxis: {
            labels: {
              formatter: (val: number) => {
                return val.toFixed(2);
              }
            }
          }
        };

        this.chartComboOptions = {
          series: [

            {
              type: "rangeArea",
              name: "Female Range",
              data: femaleData
            },
            {
              type: "rangeArea",
              name: "Male Range",
              data: maleData
            },
          ],
          chart: {
            height: 350,
            type: "rangeArea",
            animations: {
              speed: 500
            }
          },
          colors: ["#d4526e", "#33b2df", "#d4526e", "#33b2df"],
          dataLabels: {
            enabled: false
          },
          fill: {
            opacity: [0.24, 0.24, 1, 1]
          },
          forecastDataPoints: {
            count: 2,
            dashArray: 4
          },
          stroke: {
            curve: "straight",
            width: [0, 0, 2, 2]
          },
          legend: {
            show: true,
            customLegendItems: ["Female", "Male"],
            inverseOrder: true
          },
          title: {
            text: "Yearly Mass Salariale Range by Gender"
          },
          markers: {
            hover: {
              sizeOffset: 5
            }
          }
        };
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('complete');
      }
    });
  }
}
