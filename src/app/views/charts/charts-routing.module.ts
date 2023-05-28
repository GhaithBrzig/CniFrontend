import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChartsComponent } from './charts.component';
import {ChartComponent} from "./chart/chart.component";
import {ChartDonutComponent} from "./chart-donut/chart-donut.component";

const routes: Routes = [
  {
    path: '',
    component: ChartComponent,
    data: {
      title: 'Charts',
    },
  },
  {
    path: 'Donut',
    component: ChartDonutComponent,
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

