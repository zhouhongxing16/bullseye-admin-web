import { Injectable } from '@angular/core';
import {BaseService} from '../../../../utils/base.service';
import {LoginRecord} from './LoginRecord';

@Injectable({
  providedIn: 'root'
})
export class LoginRecordService extends BaseService<LoginRecord> {

  url = {
    listByPage: '/loginrecord/listByPage',
    listByParams: '/loginrecord/getListByParams',
    create: '/loginrecord/create',
    deleteById: '/loginrecord/delete',
    getById: '/loginrecord/getById',
    update: '/loginrecord/update',
    view: '',
    edit: '',
    add: '',
  };
}
