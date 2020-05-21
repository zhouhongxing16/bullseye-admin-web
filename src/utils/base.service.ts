import {Injectable} from '@angular/core';
import {Help} from './Help';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T> {

  flag = false;
  pageSize = 10;
  data = {
    rows: [],
    total: 0
  };

  private _id: string;
  public _url: {
    listByPage: string;
    listByParams: string;
    create: string;
    update: string;
    deleteById: string;
    getById: string;
    view: string;
    edit: string;
    add: string;
  };

  get url() {
    return this._url;
  }

  set url(value) {
    this._url = value;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  constructor(public help: Help) {
  }

  getListByPage(pageNum: number = 1, pageSize: number = 10, params: any): Observable<any> {
    this.flag = false;
    params.pageNum = pageNum;
    params.pageSize = pageSize;
    if (this.flag) {
      return of(this.data);
    } else {
      return this.help.post(`${this.url.listByPage}`, params).pipe(
        map(res => {
          this.flag = true;
          return this.data;
        }));
    }
  }

  getListByParams(params: any): Observable<any> {
    return this.help.post(`${this.url.listByParams}`, params).pipe(
      map(res => {
        return res;
      }));
  }

  saveOrUpdateData(data: any) {
    let url = this.url.create;
    if (data.id) {
      url = this.url.update;
    }
    return this.help.post(url, data);
  }

  deleteById(id: string) {
    return this.help.get(this.url.deleteById + `/` + id);
  }

  getById(id: string) {
    return this.help.get(this.url.getById + `/` + id);
  }

  /*
    getObject(id: string) {
      return of(this.data.rows).pipe(
        map((dataList: T[]) => dataList.find(data => data.id === id))
      );
    }*/
}
