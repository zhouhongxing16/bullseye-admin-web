import { Injectable } from '@angular/core';
import {WxReply} from './wx-reply';
import {BaseService} from '../../../../utils/base.service';

@Injectable({
  providedIn: 'root'
})
export class WxReplyService extends BaseService<WxReply> {


  url = {
    listByPage: '/wxreply/listByPage',
    create: '/wxreply/create',
    deleteById: '/wxreply/delete',
    getById: '/wxreply/getById',
    update: '/wxreply/update',
    view: '',
    edit: '',
    add: '',
  };
}
