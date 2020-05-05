import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WxReplyEditComponent} from './wx-reply-edit/wx-reply-edit.component';
import {WxReplyListComponent} from './wx-reply-list/wx-reply-list.component';

const routes: Routes = [
  {path: 'list', component: WxReplyListComponent},
  {path: 'edit/:id', component: WxReplyEditComponent},
  {path: 'add/:sourceId', component: WxReplyEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WxReplyRoutingModule { }
