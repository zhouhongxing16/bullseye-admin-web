import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WxMenuRoutingModule } from './wx-menu-routing.module';
import { WxMenuListComponent } from './wx-menu-list/wx-menu-list.component';
import { WxMenuEditComponent } from './wx-menu-edit/wx-menu-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';

@NgModule({
  declarations: [WxMenuListComponent, WxMenuEditComponent],
  imports: [
    CommonModule,
    WxMenuRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgZorroAntdModule
  ]
})
export class WxMenuModule { }
