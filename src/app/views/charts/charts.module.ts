import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BadgeModule, CardModule, GridModule } from '@coreui/angular';
import { ChartjsModule } from '@coreui/angular-chartjs';

import { ChartsComponent } from './charts.component';
import { ChartsRoutingModule } from './charts-routing.module';
import { DocsComponentsModule } from '@docs-components/docs-components.module';
import {IndivAmountChartsComponent} from "./chart/IndivAmountCharts.component";
import {ChartModule} from "@syncfusion/ej2-angular-charts";
import {FormsModule} from "@angular/forms";
import {ChartMassSalComponent} from "./chart-MasseSal/chart-MassSal.component";
import {NgCircleProgressModule} from "ng-circle-progress";
import {NgApexchartsModule} from "ng-apexcharts";
import { ChartRecutComponent } from './chart-recut/chart-recut.component';

@NgModule({
  declarations: [ChartsComponent, IndivAmountChartsComponent, ChartMassSalComponent,ChartRecutComponent],
  imports: [
    CommonModule,
    ChartsRoutingModule,
    ChartjsModule,
    CardModule,
    GridModule,
    BadgeModule,
    DocsComponentsModule,
    ChartModule,
    FormsModule,
    NgApexchartsModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      backgroundColor: "teal",
      backgroundPadding: 8,
      radius: 60,
      space: -15,
      maxPercent: 100,
      unitsColor: "#ffffff",
      outerStrokeWidth: 7.5,
      outerStrokeColor: "white",
      innerStrokeColor: "teal",
      innerStrokeWidth: 3,
      titleColor: "#ffffff",
      subtitleColor: "#ffffff"
    })

  ]
})
export class ChartsModule {
}
