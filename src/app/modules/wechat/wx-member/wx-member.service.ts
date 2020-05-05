import {Injectable} from '@angular/core';
import {WxMember} from './wx-member';
import {BaseService} from '../../../../utils/base.service';

@Injectable({
  providedIn: 'root'
})
export class WxMemberService extends BaseService<WxMember> {

  url = {
    listByPage: '/wxmember/listByPage',
    create: '/wxmember/create',
    deleteById: '/wxmember/delete',
    getById: '/wxmember/getById',
    update: '/wxmember/update',
    view: '',
    edit: '',
    add: '',
  };


}
