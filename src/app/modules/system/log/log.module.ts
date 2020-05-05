import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogRoutingModule } from './log-routing.module';
import { LogListComponent } from './log-list/log-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {CommonPipeModule} from '../../common/common-pipe.module';

@NgModule({
  declarations: [LogListComponent],
  imports: [
    CommonModule,
    LogRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgZorroAntdModule,
    CommonPipeModule
  ]
})
export class LogModule { }
