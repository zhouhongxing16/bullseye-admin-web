import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AccountEditComponent} from './account-edit/account-edit.component';
import {AccountListComponent} from './account-list/account-list.component';

const routes: Routes = [
  {path: 'list', component: AccountListComponent},
  {path: 'edit', component: AccountEditComponent},
  {path: 'add', component: AccountEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
