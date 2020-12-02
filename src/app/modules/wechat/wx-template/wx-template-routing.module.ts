import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WxTemplateListComponent} from './wx-template-list/wx-template-list.component';


const routes: Routes = [
  {path: 'list', component: WxTemplateListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WxTemplateRoutingModule { }
