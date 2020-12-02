import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WxTagListComponent} from './wx-tag-list/wx-tag-list.component';


const routes: Routes = [
  {path: 'list', component: WxTagListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WxTagRoutingModule { }
