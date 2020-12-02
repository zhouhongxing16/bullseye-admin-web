import {Component, OnInit} from '@angular/core';
import {Help} from '../../../../../utils/Help';
import {WxAccountService} from '../../wx-account/wx-account.service';
import {WxMaterialService} from '../wx-material.service';
import {WxMaterial} from '../wx-material';
import {ActivatedRoute, Router} from '@angular/router';
import {WxBaseListComponent} from '../../../../components/wxbase-list/wxbase-list.component';

@Component({
  selector: 'app-wx-material-list',
  templateUrl: './wx-material-list.component.html',
  styleUrls: ['./wx-material-list.component.scss']
})
export class WxMaterialListComponent extends WxBaseListComponent<WxMaterial> {

  constructor(private wxMaterialService: WxMaterialService,
              wxAccountService: WxAccountService, help: Help,
              route: ActivatedRoute, router: Router) {
    super(wxMaterialService, help, route, router, wxAccountService);
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
