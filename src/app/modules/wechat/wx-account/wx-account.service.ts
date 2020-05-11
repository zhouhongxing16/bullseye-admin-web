import {Injectable} from '@angular/core';
import {WxAccount} from './wx-account';
import {BaseService} from '../../../../utils/base.service';

@Injectable({
  providedIn: 'root'
})
export class WxAccountService extends BaseService<WxAccount> {
  url = {
    listByPage: '/wxaccount/listByPage',
    listByParams: '/wxaccount/getListByParams',
    create: '/wxaccount/create',
    deleteById: '/wxaccount/delete',
    getById: '/wxaccount/getById',
    update: '/wxaccount/update',
    select: '/wxaccount/select',
    view: '',
    edit: '',
    add: '',
    getListByParams: '/wxaccount/getListByParams',
  };

  getListByParams(data: any){
    return this.help.post(this.url.getListByParams, data);
  }
}
