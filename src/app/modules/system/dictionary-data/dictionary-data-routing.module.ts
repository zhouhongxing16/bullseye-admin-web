
  import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DictionaryDataListComponent} from './dictionary-data-list/dictionary-data-list.component';
import { DictionaryDataEditComponent} from './dictionary-data-edit/dictionary-data-edit.component';

const routes: Routes = [
  {path: 'list', component: DictionaryDataListComponent},
  {path: 'edit', component: DictionaryDataEditComponent},
  {path: 'add', component: DictionaryDataEditComponent}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DictionaryDataRoutingModule { }
