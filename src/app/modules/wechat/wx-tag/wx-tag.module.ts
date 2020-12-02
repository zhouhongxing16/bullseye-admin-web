import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WxTagRoutingModule } from './wx-tag-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {WxTagListComponent} from './wx-tag-list/wx-tag-list.component';
import {CommonPipeModule} from '../../common/common-pipe.module';

@NgModule({
  declarations: [WxTagListComponent],
    imports: [
        CommonModule,
        WxTagRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        NgZorroAntdModule,
        CommonPipeModule,
    ]
})
export class WxTagModule { }
