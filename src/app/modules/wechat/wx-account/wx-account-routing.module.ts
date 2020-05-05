import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WxAccountEditComponent} from './wx-account-edit/wx-account-edit.component';
import {WxAccountListComponent} from './wx-account-list/wx-account-list.component';

const routes: Routes = [
  {path: 'list', component: WxAccountListComponent},
  {path: 'edit/:id', component: WxAccountEditComponent},
  {path: 'edit', component: WxAccountEditComponent},
  {path: 'add', component: WxAccountEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WxAccountRoutingModule { }
