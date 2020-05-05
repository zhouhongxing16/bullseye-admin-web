import {Injectable} from '@angular/core';
import {Log} from './Log';
import {BaseService} from '../../../../utils/base.service';

@Injectable({
  providedIn: 'root'
})
export class LogService extends BaseService<Log> {

  url = {
    listByPage: '/log/listByPage',
    create: '/log/create',
    deleteById: '/log/delete',
    getById: '/log/getById',
    update: '/log/update',
    view: '',
    edit: '',
    add: '',
  };
}
