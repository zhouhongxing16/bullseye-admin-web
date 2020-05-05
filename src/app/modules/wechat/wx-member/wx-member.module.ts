import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WxMemberRoutingModule } from './wx-member-routing.module';
import { WxMemberListComponent } from './wx-member-list/wx-member-list.component';
import { WxMemberEditComponent } from './wx-member-edit/wx-member-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {CommonPipeModule} from '../../common/common-pipe.module';

@NgModule({
  declarations: [WxMemberListComponent, WxMemberEditComponent],
    imports: [
        CommonModule,
        WxMemberRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        NgZorroAntdModule,
        CommonPipeModule
    ]
})
export class WxMemberModule { }
