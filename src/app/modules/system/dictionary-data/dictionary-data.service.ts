import {Injectable} from '@angular/core';
import {BaseService} from '../../../../utils/base.service';

import { DictionaryData} from './DictionaryData';

@Injectable({
  providedIn: 'root'
})
export class DictionaryDataService extends BaseService<DictionaryData> {

  url = {
    listByPage: '/dictionarydata/listByPage',
    listByParams: '/dictionarydata/getListByParams',
    create: '/dictionarydata/create',
    deleteById: '/dictionarydata/delete',
    getById: '/dictionarydata/getById',
    update: '/dictionarydata/update',
    view: '',
    edit: '',
    add: '',
  };
}
