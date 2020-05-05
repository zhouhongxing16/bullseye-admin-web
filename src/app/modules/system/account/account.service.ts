import {Injectable} from '@angular/core';
import {BaseService} from '../../../../utils/base.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends BaseService<Account> {

  url = {
    listByPage: '/account/listByPage',
    create: '/account/create',
    deleteById: '/account/delete',
    getById: '/account/getById',
    update: '/account/update',
    view: '',
    edit: '',
    add: '',
    getAllRoles: '/role/getAllRoles',
    getRolesByAccountId: '/role/getRolesByAccountId',
    saveAccountRoles: '/accountrole/saveAccountRoles',
  };

  getAllRoles(data: any) {
    return this.help.post(this.url.getAllRoles, data);
  }

  getRolesByAccountId(id: string) {
    return this.help.get(this.url.getRolesByAccountId + '/' + id);
  }

  saveAccountRoles(data: any) {
    return this.help.post(this.url.saveAccountRoles, data);
  }
}
