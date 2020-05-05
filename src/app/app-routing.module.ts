import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DefaultLayoutComponent} from './components/default-layout/default-layout.component';
import {LoginComponent} from './components/login/login.component';


const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {path: 'menu', loadChildren: () => import('././modules/system/menu/menu.module').then(m => m.MenuModule)},

      {path: 'log', loadChildren: () => import('././modules/system/log/log.module').then(m => m.LogModule)},
      {
        path: 'loginrecord', loadChildren: () =>
          import('././modules/system/login-record/login-record.module').then(m => m.LoginRecordModule)
      },
      {path: 'monitor', loadChildren: () => import('././modules/system/monitor/monitor.module').then(m => m.MonitorModule)},
      {path: '', loadChildren: () => import('././modules/home/home.module').then(m => m.HomeModule)}
    ]
  },
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
