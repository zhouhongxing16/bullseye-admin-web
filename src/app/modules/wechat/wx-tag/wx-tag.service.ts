import { Injectable } from '@angular/core';
import {WxTag} from './wx-tag';
import {BaseService} from '../../../../utils/base.service';

@Injectable({
  providedIn: 'root'
})
export class WxTagService extends BaseService<WxTag> {


  url = {
    listByPage: '/wxtag/listByPage',
    listByParams: '/wxtag/getListByParams',
    create: '/wxtag/create',
    deleteById: '/wxtag/delete',
    getById: '/wxtag/getById',
    update: '/wxtag/update',
    view: '',
    edit: '',
    add: '',
  };
}
