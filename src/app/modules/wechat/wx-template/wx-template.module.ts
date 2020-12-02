import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WxTemplateRoutingModule } from './wx-template-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {CommonPipeModule} from '../../common/common-pipe.module';
import {WxTemplateListComponent} from './wx-template-list/wx-template-list.component';

@NgModule({
  declarations: [WxTemplateListComponent],
    imports: [
        CommonModule,
        WxTemplateRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        NgZorroAntdModule,
        CommonPipeModule,
    ]
})
export class WxTemplateModule { }
