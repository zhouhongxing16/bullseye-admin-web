import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DictionaryTypeRoutingModule } from './dictionary-type-routing.module';
import { DictionaryTypeListComponent } from './dictionary-type-list/dictionary-type-list.component';
import { DictionaryTypeEditComponent } from './dictionary-type-edit/dictionary-type-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {CommonPipeModule} from '../../common/common-pipe.module';

@NgModule({
  declarations: [DictionaryTypeListComponent, DictionaryTypeEditComponent],
  imports: [
    CommonModule,
    DictionaryTypeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgZorroAntdModule,
    CommonPipeModule
  ]
})
export class DictionaryTypeModule { }
