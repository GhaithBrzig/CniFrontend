import { Component, OnInit } from '@angular/core';
import { CsvService } from "../../../core/services/csv.service";
import { CsvFile } from "../../../core/model/csvfile";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  public dataCsv: CsvFile[];
  public cellNames: string[] = [];
  public selectedCellName: string;
  public filteredDataCsv: CsvFile[];
  public chartData: Object[];

  constructor(private csvSer: CsvService) {}

  public primaryXAxis: Object;
  public primaryYAxis: Object;
  public legendSettings: Object;
  public tooltip: Object;
  public title: string;
  public marker: Object;
  public selectedValue: string = 'Integrity';

  ngOnInit(): void {
    this.csvSer.getAll().subscribe({
      next: (params) => {
        this.dataCsv = params;
        this.filteredDataCsv = this.dataCsv.slice(0, 12); // Selecting the first 12 elements
        this.generateChartData();
        this.generateCellNames();
        this.configureChart();
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('complete');
      }
    });

    this.tooltip = {
      enable: true
    };
    this.title = 'Integrity';
    this.marker = {
      dataLabel: {
        visible: true
      }
    };
    this.legendSettings = {
      visible: true
    };
  }

  public generateChartData(): void {
    if (this.selectedValue === 'Integrity') {
      this.chartData = this.filteredDataCsv.slice(0, 12).map((item, index) => {
        const hour = new Date().setHours(0, 0, 0) + index * 2 * 60 * 60 * 1000;
        const formattedHour = new Date(hour).toLocaleString('en-US', { hour: 'numeric', hour12: true });
        const integrity = item.cellTrafficVolume / (1000 * item.cellTransferTime);
        return { hour: formattedHour, value: integrity };
      });
      this.title = 'Integrity';
    } else if (this.selectedValue === 'Accessibility') {
      this.chartData = this.filteredDataCsv.slice(0, 12).map((item, index) => {
        const hour = new Date().setHours(0, 0, 0) + index * 2 * 60 * 60 * 1000;
        const formattedHour = new Date(hour).toLocaleString('en-US', { hour: 'numeric', hour12: true });
        const accessibility = item.rrcconnectionSuccess / item.rrcconnectionAttempt;
        return { hour: formattedHour, value: accessibility };
      });
      this.title = 'Accessibility';
    } else if (this.selectedValue === 'Retainability') {
      this.chartData = this.filteredDataCsv.slice(0, 12).map((item, index) => {
        const hour = new Date().setHours(0, 0, 0) + index * 2 * 60 * 60 * 1000;
        const formattedHour = new Date(hour).toLocaleString('en-US', {hour: 'numeric', hour12: true});
        const retainability = item.erabAbnormalRelease / item.erabRelease;
        return {hour: formattedHour, value: retainability};
      });
      this.title = 'Retainability';
    } else if (this.selectedValue === 'Mobility') {
      this.chartData = this.filteredDataCsv.slice(0, 12).map((item, index) => {
        const hour = new Date().setHours(0, 0, 0) + index * 2 * 60 * 60 * 1000;
        const formattedHour = new Date(hour).toLocaleString('en-US', {hour: 'numeric', hour12: true});
        const mobility = item.intraFreqSuccess / item.intraFreqAttempt;
        return {hour: formattedHour, value: mobility};
      });
      this.title = 'Mobility';
    }  else if (this.selectedValue === 'Traffic') {
      this.chartData = this.filteredDataCsv.slice(0, 12).map((item, index) => {
        const hour = new Date().setHours(0, 0, 0) + index * 2 * 60 * 60 * 1000;
        const formattedHour = new Date(hour).toLocaleString('en-US', {hour: 'numeric', hour12: true});
        const traffic = item.avgUserNum;
        return {hour: formattedHour, value: traffic};
      });
      this.title = 'Traffic';
    }
  }
  public generateCellNames(): void {
    this.cellNames = Array.from(new Set(this.dataCsv.map(item => item.cellName)));
  }

  public configureChart(): void {
    this.primaryXAxis = {
      valueType: 'Category'
    };
    this.primaryYAxis = {
      labelFormat: '{value}'
    };
  }

  public filterDataCsv(): void {
    if (this.selectedCellName) {
      this.filteredDataCsv = this.dataCsv.filter(item => item.cellName === this.selectedCellName).slice(0, 12);
    } else {
      this.filteredDataCsv = this.dataCsv.slice(0, 12);
    }
    this.generateChartData();
  }


}
