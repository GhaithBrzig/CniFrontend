import {Component, OnInit} from '@angular/core';
import {CsvService} from "../../../core/services/csv.service";
import {CsvFile} from "../../../core/model/csvfile";

@Component({
  selector: 'app-chart-donut',
  templateUrl: './chart-donut.component.html',
  styleUrls: ['./chart-donut.component.scss']
})
export class ChartDonutComponent implements OnInit {
  public dataCsv: CsvFile[];
  public integrity: any
  public cellNames: string[] = [];
  public selectedCellName: string;
  public filteredDataCsv: CsvFile[];
  public mobility: any;
  public retainability: number;
  public accessability: number;
  public averageUsers: number;
  constructor(private csvSer: CsvService) {}


  ngOnInit(): void {
    this.csvSer.getAll().subscribe({
      next: (params) => {
        this.dataCsv = params;
        this.filteredDataCsv = this.dataCsv.slice(0, 12);
        this.filterDataCsv()
        this.generateCellNames();
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('complete');
      }
    });
  }

  public generateCellNames(): void {
    this.cellNames = Array.from(new Set(this.dataCsv.map(item => item.cellName)));
  }

  public filterDataCsv(): void {
    if (this.selectedCellName) {
      this.filteredDataCsv = this.dataCsv.filter(item => item.cellName === this.selectedCellName).slice(0, 12);
    } else {
      this.filteredDataCsv = this.dataCsv.slice(0, 12);
    }

    const filteredItemsCount = this.filteredDataCsv.length;
    const rrcConnectionSuccessSum = this.filteredDataCsv.reduce((sum, item) => sum + item.rrcconnectionSuccess, 0);
    const rrcConnectionAttemptSum = this.filteredDataCsv.reduce((sum, item) => sum + item.rrcconnectionAttempt, 0);
    this.accessability = (rrcConnectionSuccessSum / rrcConnectionAttemptSum) * 100 / filteredItemsCount;
    const intraFreqSuccessSum = this.filteredDataCsv.reduce((sum, item) => sum + item.intraFreqSuccess, 0);
    const intraFreqAttemptSum = this.filteredDataCsv.reduce((sum, item) => sum + item.intraFreqAttempt, 0);
    this.mobility = (intraFreqSuccessSum / intraFreqAttemptSum) * 100 / filteredItemsCount;
   const erabAbnormalReleaseSum = this.filteredDataCsv.reduce((sum, item) => sum + item.erabAbnormalRelease, 0);
    const erabReleaseSum = this.filteredDataCsv.reduce((sum, item) => sum + item.erabRelease, 0);
    this.retainability = (erabAbnormalReleaseSum / erabReleaseSum) * 100 / filteredItemsCount;
    const cellTrafficVolumeSum = this.filteredDataCsv.reduce((sum, item) => sum + item.cellTrafficVolume, 0);
    const cellTransferTimeSum = this.filteredDataCsv.reduce((sum, item) => sum + item.cellTransferTime, 0);
    this.integrity = (cellTrafficVolumeSum / 1000*cellTransferTimeSum) * 100 / filteredItemsCount;
    const avgUserNumSum = this.filteredDataCsv.reduce((sum, item) => sum + item.avgUserNum, 0);
    this.averageUsers = (avgUserNumSum) * 100 / filteredItemsCount;

  }

}
