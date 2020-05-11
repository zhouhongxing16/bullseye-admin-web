import {Injectable} from '@angular/core';
import {Staff} from './staff';
import {BaseService} from '../../../../utils/base.service';

@Injectable({
  providedIn: 'root'
})
export class StaffService extends BaseService<Staff> {

  url = {
    listByPage: '/staff/listByPage',
    listByParams: '/staff/getListByParams',
    create: '/staff/create',
    deleteById: '/staff/delete',
    getById: '/staff/getById',
    update: '/staff/update',
    view: '',
    edit: '',
    add: '',
  };
}
