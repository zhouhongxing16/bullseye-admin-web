import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DefaultLayoutComponent} from './components/default-layout/default-layout.component';
import {LoginComponent} from './components/login/login.component';


const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {path: 'staff', loadChildren:  () => import('././modules/system/staff/staff.module').then(m => m.StaffModule)},
      {path: 'account', loadChildren:  () => import('././modules/system/account/account.module').then(m => m.AccountModule)},
      {path: 'role', loadChildren:  () => import( './modules/system/role/role.module').then(m => m.RoleModule)},
      {path: 'menu', loadChildren: () => import('././modules/system/menu/menu.module').then(m => m.MenuModule)},
      {path: 'department', loadChildren: () => import( '././modules/system/department/department.module').then(m => m.DepartmentModule)},
      {path: 'organization', loadChildren: () => import( '././modules/system/organization/organization.module').then(m => m.OrganizationModule)},
      {path: 'log', loadChildren: () => import('././modules/system/log/log.module').then(m => m.LogModule)},
      {
        path: 'loginrecord', loadChildren: () =>
          import('././modules/system/login-record/login-record.module').then(m => m.LoginRecordModule)
      },
      {path: 'monitor', loadChildren: () => import('././modules/system/monitor/monitor.module').then(m => m.MonitorModule)},

      // 微信
      {path: 'wxaccount',  loadChildren: () => import('././modules/wechat/wx-account/wx-account.module').then(m => m.WxAccountModule)},
      {path: 'wxmember',  loadChildren: () => import( '././modules/wechat/wx-member/wx-member.module').then(m => m.WxMemberModule)},
      {path: 'wxmenu',  loadChildren: () => import( '././modules/wechat/wx-menu/wx-menu.module').then(m => m.WxMenuModule)},
      {path: 'wxreply',  loadChildren: () => import( '././modules/wechat/wx-reply/wx-reply.module').then(m => m.WxReplyModule)},
      {path: 'wxmaterial',  loadChildren: () => import('././modules/wechat/wx-material/wx-material.module').then(m => m.WxMaterialModule)},

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
