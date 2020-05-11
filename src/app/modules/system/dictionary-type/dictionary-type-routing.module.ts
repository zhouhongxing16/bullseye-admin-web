import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DictionaryTypeListComponent} from './dictionary-type-list/dictionary-type-list.component';
import {DictionaryTypeEditComponent} from './dictionary-type-edit/dictionary-type-edit.component';

const routes: Routes = [
  {path: 'list', component: DictionaryTypeListComponent},
  {path: 'edit', component: DictionaryTypeEditComponent},
  {path: 'add', component: DictionaryTypeEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DictionaryTypeRoutingModule {
}
