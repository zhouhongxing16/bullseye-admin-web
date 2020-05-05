import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountEditComponent } from './account-edit/account-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {CommonPipeModule} from '../../common/common-pipe.module';

@NgModule({
  declarations: [AccountListComponent, AccountEditComponent],
    imports: [
        CommonModule,
        AccountRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        NgZorroAntdModule,
        CommonPipeModule
    ]
})
export class AccountModule { }
