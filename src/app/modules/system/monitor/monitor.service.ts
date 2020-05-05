import { Injectable } from '@angular/core';
import {BaseService} from '../../../../utils/base.service';

@Injectable({
  providedIn: 'root'
})
export class MonitorService extends BaseService<null> {
  url = {
    listByPage: '/',
    create: '',
    deleteById: '',
    getById: '',
    update: '',
    view: '',
    edit: '',
    add: '',
    getInfo: '/monitor/getInfo',
  };

  getInfo() {
    return this.help.get(this.url.getInfo);
  }
}
