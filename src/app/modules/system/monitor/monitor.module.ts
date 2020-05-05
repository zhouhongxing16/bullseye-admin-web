import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitorRoutingModule } from './monitor-routing.module';
import { MonitorListComponent } from './monitor-list/monitor-list.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';

@NgModule({
    declarations: [MonitorListComponent],
  imports: [
    CommonModule,
    MonitorRoutingModule,
    NgZorroAntdModule,
    FormsModule,
  ]
})
export class MonitorModule { }
