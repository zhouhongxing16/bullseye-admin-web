import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import {HomeListComponent} from './home-list/home-list.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';

@NgModule({
  declarations: [HomeListComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgZorroAntdModule
  ]
})
export class HomeModule { }
