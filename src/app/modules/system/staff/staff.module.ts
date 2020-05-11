import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffRoutingModule } from './staff-routing.module';
import { StaffListComponent } from './staff-list/staff-list.component';
import { StaffEditComponent } from './staff-edit/staff-edit.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DictionaryComponent} from '../../../components/dictionary/dictionary.component';

@NgModule({
  declarations: [StaffListComponent, StaffEditComponent, DictionaryComponent],
    imports: [
        CommonModule,
        StaffRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        NgZorroAntdModule,
    ]
})
export class StaffModule { }
