import { Injectable } from '@angular/core';
import {BaseService} from '../../../../utils/base.service';
import {Role} from '../role/role';

@Injectable({
  providedIn: 'root'
})
export class RoleMenuAuthService extends BaseService<Role> {
  url = {
    listByPage: '/role/listByPage',
    listByParams: '/role/getListByParams',
    create: '/role/create',
    deleteById: '/role/delete',
    getById: '/role/getById',
    update: '/role/update',
    view: '',
    edit: '',
    add: '',
    getAllMenus: '/menu/getAllMenus',
    getListByParams: '/rolemenuauth/getListByParams',
    createRoleMenuAuth: '/rolemenuauth/createRoleMenuAuth',
    getMenuAndAuthByRoleId: '/rolemenuauth/getMenuAndAuthByRoleId',
  };


  getMenuAndAuthByRoleId(roleId: string) {
    return this.help.get(this.url.getMenuAndAuthByRoleId + `/` + roleId);
  }

  createRoleMenuAuth(params: any) {
    return this.help.post(this.url.createRoleMenuAuth, params);
  }

  getRoleMenuAuthCheckedData(data: any) {
    return this.help.post(this.url.getListByParams, data);
  }

}
