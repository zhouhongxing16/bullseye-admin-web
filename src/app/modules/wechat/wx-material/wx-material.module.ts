import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WxMaterialRoutingModule } from './wx-material-routing.module';
import { WxMaterialListComponent } from './wx-material-list/wx-material-list.component';
import { WxMaterialEditComponent } from './wx-material-edit/wx-material-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';

@NgModule({
  declarations: [WxMaterialListComponent, WxMaterialEditComponent],
  imports: [
    CommonModule,
    WxMaterialRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgZorroAntdModule,
  ]
})
export class WxMaterialModule { }
