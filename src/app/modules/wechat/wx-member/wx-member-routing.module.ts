import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WxMemberEditComponent} from './wx-member-edit/wx-member-edit.component';
import {WxMemberListComponent} from './wx-member-list/wx-member-list.component';

const routes: Routes = [
  {path: 'list', component: WxMemberListComponent},
  {path: 'edit/:id', component: WxMemberEditComponent},
  {path: 'edit', component: WxMemberEditComponent},
  {path: 'add', component: WxMemberEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WxMemberRoutingModule { }
