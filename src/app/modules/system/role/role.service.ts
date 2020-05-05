import { Injectable } from '@angular/core';
import {BaseService} from '../../../../utils/base.service';
import {Role} from './role';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends BaseService<Role> {
  url = {
    listByPage: '/role/listByPage',
    create: '/role/create',
    deleteById: '/role/delete',
    getById: '/role/getById',
    update: '/role/update',
    view: '',
    edit: '',
    add: '',
    getAllMenus: '/menu/getAllMenus',
    getListByParams: '/rolemenu/getListByParams',
    createRoleMenu: '/rolemenu/createRoleMenu',
    getOrganizationAuthMenus: '/menu/getOrganizationAuthMenus',
  };

  getOrganizationAuthMenus(params) {
    return this.help.post(this.url.getOrganizationAuthMenus, params);
  }

  saveRoleMenus(params) {
    return this.help.post(this.url.createRoleMenu, params);
  }

  getCheckedLeafMenus(data: any) {
    return this.help.post(this.url.getListByParams, data);
  }
}
