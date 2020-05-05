import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {Menu} from './menu';
import {BaseService} from '../../../../utils/base.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService extends BaseService<Menu> {

  url = {
    listByPage: '/menu/listByPage',
    getMenuAuthListByPage: '/menuauth/listByPage',
    create: '/menu/create',
    deleteById: '/menu/delete',
    getById: '/menu/getById',
    update: '/menu/update',
    view: '',
    edit: '',
    add: '',
    getAllMenus: '/menu/getAllMenus',
    getOrganizationMenus: '/menu/getOrganizationMenus',
  };


  getAllMenus() {
    return this.help.post(this.url.getAllMenus, null);
  }

  getOrganizationMenus(params) {
    return this.help.post(this.url.getOrganizationMenus, params);
  }



  getMenuAuthListByPage(pageNum: number = 1, pageSize: number = 10, params: any): Observable<any> {
    this.flag = false;
    params.pageNum = pageNum;
    params.pageSize = pageSize;
    if (this.flag) {
      return of(this.data);
    } else {
      return this.help.post(`${this.url.getMenuAuthListByPage}`, params).pipe(
        map(res => {
          this.flag = true;
          this.data = {
            rows: res.rows,
            total: res.total
          };
          return this.data;
        }));
    }
  }
}
