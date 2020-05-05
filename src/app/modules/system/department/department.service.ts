import {Injectable} from '@angular/core';
import {Department} from './department';
import {BaseService} from '../../../../utils/base.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService extends BaseService<Department> {

   url = {
    listByPage: '/department/listByPage',
    create: '/department/create',
    deleteById: '/department/delete',
    getById: '/department/getById',
    update: '/department/update',
    view: '',
    edit: '',
    add: '',
  };
}
