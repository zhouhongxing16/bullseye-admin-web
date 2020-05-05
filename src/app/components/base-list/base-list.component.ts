import {OnInit} from '@angular/core';
import {BaseService} from '../../../utils/base.service';
import {Help} from '../../../utils/Help';
import {ActivatedRoute, Router} from '@angular/router';

export class BaseListComponent<T> implements OnInit {

  rows: any = [];
  total = 0;
  pageIndex = 1;
  pageSize = 10;
  loading = false;
  authData: any = {
    auths: [],
    flag: false,
    authCode: ''
  };

  constructor(public service: BaseService<T>, public help: Help, public route: ActivatedRoute, public router: Router) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.authData.authCode = params.code;
      if (this.help.isEmpty(params.code)) {
        this.authData.flag = false;
      } else {
        this.authData.flag = true;
        const dec = window.atob(params.code);
        this.authData.auths = JSON.parse(dec);
      }
      if (!this.help.isEmpty(params.pageSize) && !this.help.isEmpty(params.pageIndex)) {
        this.pageSize = params.pageSize;
        this.pageIndex = params.pageIndex;
      }
    });
    this.getListByPage();
  }

  getListByPage(reset: boolean = false) {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    this.service.getListByPage(this.pageIndex, this.pageSize, {}).subscribe(data => {
      this.loading = false;
      this.rows = data.rows;
      this.total = data.total;
    }, err => {
      this.loading = false;
      this.help.showMessage('error', `请求出现错误: ${JSON.stringify(err)}`);
    });
  }

  deleteRow(id: string) {
    this.help.loading('删除中...');
    this.service.deleteById(id).subscribe(res => {
      if (res.success) {
        this.help.stopLoad();
        this.help.showMessage('success', res.message);
        this.getListByPage(true);
      } else {
        this.help.showMessage('error', res.message);
      }
    });
  }

  goToPage(path: string, params: any) {
    params.pageIndex = this.pageIndex;
    params.pageSize = this.pageSize;
    this.router.navigate([path], {
      queryParams: params
    });
  }

  initAuth(code: string) {
    if (this.authData.flag) {
      console.log(code);
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.authData.auths.length; i++) {
        if (this.authData.auths[i].code === code) {
          return true;
        }
      }
    } else {
      return false;
    }


  }
}
