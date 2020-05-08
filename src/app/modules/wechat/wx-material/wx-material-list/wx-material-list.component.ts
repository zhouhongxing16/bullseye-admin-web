import {Component, OnInit} from '@angular/core';
import {WxAccount} from '../../wx-account/wx-account';
import {Help} from '../../../../../utils/Help';
import {WxAccountService} from '../../wx-account/wx-account.service';
import {WxMaterialService} from '../wx-material.service';
import {WxMaterial} from '../wx-material';
import {BaseListComponent} from '../../../../components/base-list/base-list.component';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-wx-material-list',
  templateUrl: './wx-material-list.component.html',
  styleUrls: ['./wx-material-list.component.scss']
})
export class WxMaterialListComponent extends BaseListComponent<WxMaterial> {

  params: any = {};
  // 可选的微信号
  wxAccounts: WxAccount[] = [];
  // 选中的微信sourceId
  chooseWxSourceId = '';

  // 方法开始全选多选
  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  listOfDisplayData = [];
  mapOfCheckedId = {};

  constructor(private  wxMaterialService: WxMaterialService,
              private wxAccountService: WxAccountService, help: Help,
              route: ActivatedRoute, router: Router) {
    super(wxMaterialService, help, route, router);
  }

  currentPageDataChange($event: Array<{}>): void {
    this.listOfDisplayData = $event;
    this.refreshStatus();
  }

  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.listOfDisplayData.every(item => this.mapOfCheckedId[item.id]);
    this.isIndeterminate = this.listOfDisplayData.some(item => this.mapOfCheckedId[item.id]) && !this.isAllDisplayDataChecked;
  }

  checkAll(value: boolean): void {
    this.listOfDisplayData.forEach(item => this.mapOfCheckedId[item.id] = value);
    this.refreshStatus();
  }

  getWxaccount() {
    this.wxAccountService.getListByParams({}).subscribe(data => {
      console.log(data.data);
      this.wxAccounts = data.data;
      this.chooseWxSourceId = this.wxAccounts[0].sourceId;
      this.params.sourceId = this.chooseWxSourceId;
    }, err => {
    });
  }

  UploadRow(id: string) {
    this.help.loading('上传中...');
    this.wxMaterialService.materialUpload(id).subscribe(res => {
      this.help.isLoading = false;
      if (res.success) {
        this.help.showMessage('success', res.message);
      } else {
        this.help.showMessage('error', res.message);
      }
    });
  }

  unUploadRow(id: string) {
    this.help.loading('正在删除...');
    this.wxMaterialService.materialDelete(id).subscribe(res => {
      this.help.isLoading = false;
      if (res.success) {
        this.help.showMessage('success', res.message);
      } else {
        this.help.showMessage('error', res.message);
      }
    });
  }

  PubRow(id: string) {
    this.help.loading('推送中...');
    this.wxMaterialService.pubMaterialToUser(id).subscribe(res => {
      this.help.isLoading = false;
      if (res.success) {
        this.help.showMessage('success', res.message);
      } else {
        this.help.showMessage('error', res.message);
      }
    });
  }


}
