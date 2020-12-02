import { Injectable } from '@angular/core';
import {WxTemplate} from './wx-template';
import {BaseService} from '../../../../utils/base.service';

@Injectable({
  providedIn: 'root'
})
export class WxTemplateService extends BaseService<WxTemplate> {


  url = {
    listByPage: '/wxtemplate/listByPage',
    listByParams: '/wxtemplate/getListByParams',
    create: '/wxtemplate/create',
    deleteById: '/wxtemplate/delete',
    getById: '/wxtemplate/getById',
    update: '/wxtemplate/update',
    view: '',
    edit: '',
    add: '',
    getAllPrivateTemplate: '/wxtemplate/getAllPrivateTemplate'
  };

  getAllPrivateTemplate(sourceId: string) {
    return this.help.get(this.url.getAllPrivateTemplate + `/` + sourceId);
  }
}
