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
    listByParams: '/menu/getListByParams',
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
    deleteMenuAuthById: '/menuauth/delete',
  };


  getAllMenus() {
    return this.help.get(this.url.getAllMenus);
  }

  getOrganizationMenus(params) {
    return this.help.post(this.url.getOrganizationMenus, params);
  }

  deleteMenuAuthById(id: string) {
    return this.help.get(this.url.deleteMenuAuthById + `/` + id);
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
          console.log(res)
          this.flag = true;
          this.data = {
            rows: res.page.list,
            total: res.page.total
          };
          return this.data;
        }));
    }
  }
}
