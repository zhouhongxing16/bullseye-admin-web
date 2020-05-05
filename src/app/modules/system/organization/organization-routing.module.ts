import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OrganizationEditComponent} from './organization-edit/organization-edit.component';
import {OrganizationListComponent} from './organization-list/organization-list.component';

const routes: Routes = [
  {path: 'list', component: OrganizationListComponent},
  {path: 'edit', component: OrganizationEditComponent},
  {path: 'add', component: OrganizationEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule { }
