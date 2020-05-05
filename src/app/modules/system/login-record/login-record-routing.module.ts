import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginRecordListComponent} from './login-record-list/login-record-list.component';

const routes: Routes = [
  {path: 'list', component: LoginRecordListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRecordRoutingModule { }
