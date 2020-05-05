import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WxMenuEditComponent} from './wx-menu-edit/wx-menu-edit.component';
import {WxMenuListComponent} from './wx-menu-list/wx-menu-list.component';

const routes: Routes = [
  {path: 'list', component: WxMenuListComponent},
  {path: 'edit', component: WxMenuEditComponent},
  {path: 'add', component: WxMenuEditComponent},
  {path: 'addChild', component: WxMenuEditComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WxMenuRoutingModule { }
