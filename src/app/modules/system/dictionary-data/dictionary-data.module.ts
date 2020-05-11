import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DictionaryDataRoutingModule } from './dictionary-data-routing.module';
import { DictionaryDataListComponent } from './dictionary-data-list/dictionary-data-list.component';
import { DictionaryDataEditComponent } from './dictionary-data-edit/dictionary-data-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';

@NgModule({
  declarations: [DictionaryDataListComponent, DictionaryDataEditComponent],
  imports: [
    CommonModule,
    DictionaryDataRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgZorroAntdModule
  ]
})
export class DictionaryDataModule { }
