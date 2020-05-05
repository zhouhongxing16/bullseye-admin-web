import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitorRoutingModule } from './monitor-routing.module';
import { MonitorListComponent } from './monitor-list/monitor-list.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TinyEditorComponent} from "../../../components/tiny-editor/tiny-editor.component";
import {EditorModule} from "@tinymce/tinymce-angular";

@NgModule({
    declarations: [MonitorListComponent,TinyEditorComponent],
  imports: [
    CommonModule,
    MonitorRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
  ]
})
export class MonitorModule { }
