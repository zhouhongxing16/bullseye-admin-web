import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MonitorListComponent} from './monitor-list/monitor-list.component';

const routes: Routes = [
  {path: 'list', component: MonitorListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitorRoutingModule { }
