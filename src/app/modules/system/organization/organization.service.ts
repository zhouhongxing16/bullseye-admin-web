import {Injectable} from '@angular/core';
import {BaseService} from '../../../../utils/base.service';
import {Organization} from './organization';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService extends BaseService<Organization> {
  url = {
    listByPage: '/organization/listByPage',
    create: '/organization/create',
    deleteById: '/organization/delete',
    getById: '/organization/getById',
    update: '/organization/update',
    view: '',
    edit: '',
    add: '',
    createOrganizationMenu: '/organizationmenu/createOrganizationMenu',
    getListByParams: '/organizationmenu/getListByParams',
  };

  saveOrganizationMenus(data: any) {
    return this.help.post(this.url.createOrganizationMenu, data);
  }

  getCheckedLeafMenus(data: any) {
    return this.help.post(this.url.getListByParams, data);
  }
}
