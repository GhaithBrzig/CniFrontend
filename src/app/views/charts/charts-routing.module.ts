import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChartsComponent } from './charts.component';
import {IndivAmountChartsComponent} from "./chart/IndivAmountCharts.component";
import {ChartMassSalComponent} from "./chart-MasseSal/chart-MassSal.component";
import {ChartRecutComponent} from "./chart-recut/chart-recut.component";

const routes: Routes = [
  {
    path: '',
    component: IndivAmountChartsComponent,
    data: {
      title: 'Charts',
    },
  },
  {
    path: 'Recut',
    component: ChartRecutComponent,
    data: {
      title: 'Recut Charts',
    },
  },
  {
    path: 'Donut',
    component: ChartMassSalComponent,
    data: {
      title: 'Chart',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChartsRoutingModule {}

