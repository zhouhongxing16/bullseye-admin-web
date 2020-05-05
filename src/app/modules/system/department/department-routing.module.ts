import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DepartmentListComponent} from './department-list/department-list.component';
import {DepartmentEditComponent} from './department-edit/department-edit.component';
const routes: Routes = [
  {path: 'list', component: DepartmentListComponent},
  {path: 'edit', component: DepartmentEditComponent},
  {path: 'add', component: DepartmentEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule { }
