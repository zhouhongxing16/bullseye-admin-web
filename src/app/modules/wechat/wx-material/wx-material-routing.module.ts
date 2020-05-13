import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WxMaterialListComponent} from './wx-material-list/wx-material-list.component';
import {WxMaterialEditComponent} from './wx-material-edit/wx-material-edit.component';

const routes: Routes = [
  {path: 'list', component: WxMaterialListComponent},
  {path: 'edit/:id', component: WxMaterialEditComponent},
  {path: 'edit', component: WxMaterialEditComponent},
  {path: 'add/:sourceId', component: WxMaterialEditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WxMaterialRoutingModule { }
