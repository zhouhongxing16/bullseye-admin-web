import {Injectable} from '@angular/core';
import { DictionaryType} from './DictionaryType';
import {BaseService} from '../../../../utils/base.service';

@Injectable({
  providedIn: 'root'
})
export class DictionaryTypeService extends BaseService<DictionaryType> {

  url = {
    listByPage: '/dictionarytype/listByPage',
    listByParams: '/dictionarytype/getListByParams',
    create: '/dictionarytype/create',
    deleteById: '/dictionarytype/delete',
    getById: '/dictionarytype/getById',
    update: '/dictionarytype/update',
    view: '',
    edit: '',
    add: '',
  };
}
