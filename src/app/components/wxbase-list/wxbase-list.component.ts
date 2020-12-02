import {OnInit} from '@angular/core';
import {BaseService} from '../../../utils/base.service';
import {Help} from '../../../utils/Help';
import {ActivatedRoute, Router} from '@angular/router';
import {WxAccountService} from '../../modules/wechat/wx-account/wx-account.service';
import {WxAccount} from '../../modules/wechat/wx-account/wx-account';

export class WxBaseListComponent<T> implements OnInit {
  params: any = {
    keyword: '',
    sourceId: ''
  };
  rows: any = [];
  total = 0;
  pageIndex = 1;
  pageSize = 10;
  timeOut: any;
  authData: any = {
    auths: [],
    flag: false,
    authCode: ''
  };
  auth: any = {};
  wxAccounts: WxAccount[] = [];

  constructor(public service: BaseService<T>, public help: Help, public route: ActivatedRoute, public router: Router, public wxAccountService: WxAccountService) {
  }

  ngOnInit() {
    this.initAuthData();
    this.getWxAccount();
  }

  initAuthData() {
    this.route.queryParams.subscribe(params => {
      this.authData.authCode = params.code;
      if (this.help.isEmpty(params.code)) {
        this.authData.flag = false;
      } else {
        this.authData.flag = true;
        const dec = window.atob(params.code);
        console.log(dec);
        this.authData.auths = JSON.parse(dec);
      }
      if (!this.help.isEmpty(params.pageSize) && !this.help.isEmpty(params.pageIndex)) {
        this.pageSize = params.pageSize;
        this.pageIndex = params.pageIndex;
      }
    });
    this.initAuthFlag();
  }

  search(event: any, click: boolean) {

    const that = this;
    if (!click) {
      if (!this.help.isEmpty(this.params.keyword)) {
        clearTimeout(this.timeOut);
        this.timeOut = setTimeout(() => {
          that.getListByPage(false);
        }, 1500);
      }
    } else {
      that.getListByPage(false);
    }
  }

  getWxAccount() {
    this.wxAccountService.getListByParams({}).subscribe(data => {
      console.log(data);
      this.wxAccounts = data.list;
      this.params.sourceId = this.wxAccounts[0].sourceId;
      this.getListByPage();
    }, err => {
    });
  }

  getListByPage(reset: boolean = false) {
    if (reset) {
      this.pageIndex = 1;
    }
    this.help.isLoading = true;
    this.service.getListByPage(this.pageIndex, this.pageSize, this.params).subscribe(data => {
      this.help.isLoading = false;
      this.rows = data.page.list;
      console.log('rows:'+JSON.stringify(this.rows))
      this.total = data.page.total;
    }, err => {
      this.help.isLoading = false;
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

  initAuthFlag() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.authData.auths.length; i++) {
      this.auth[this.authData.auths[i].code] = true;
    }
  }
}
