import {Component, OnInit} from '@angular/core';
import {WxReplyService} from '../wx-reply.service';
import {Help} from '../../../../../utils/Help';
import {WxReply} from '../wx-reply';
import {WxAccountService} from '../../wx-account/wx-account.service';
import {WxAccount} from '../../wx-account/wx-account';

@Component({
  selector: 'app-wx-reply-list',
  templateUrl: './wx-reply-list.component.html',
  styleUrls: ['./wx-reply-list.component.scss']
})
export class WxReplyListComponent implements OnInit {
  rows: WxReply[] = [];
  total = 0;
  pageIndex = 1;
  pageSize = 10;
  sortValue = null;
  sortKey = null;
  loading = false;

  //公众号列表
  wxAccounts: WxAccount[] = [];
  //当前公众号
  chooseSourceId = '';

  constructor(private wxReplyService: WxReplyService, private help: Help, private wxAccountService: WxAccountService) {
  }

  ngOnInit() {
    this.getWxaccount();
  }

  getWxaccount() {
    this.wxAccountService.getListByParams({}).subscribe(data => {
      console.log(data.data);
      this.wxAccounts = data.data;
      this.getListByPage(this.wxAccounts[0].sourceId, true);
    }, err => {

    });
  }

  getListByPage(sourceId: string, reset: boolean = false) {
    if (reset) {
      this.pageIndex = 1;
    }
    this.chooseSourceId = sourceId;
    this.loading = true;
    this.wxReplyService.getListByPage(this.pageIndex, this.pageSize, {sourceId: sourceId}).subscribe(data => {
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
    this.wxReplyService.deleteById(id).subscribe(res => {
      if (res.success) {
        this.help.stopLoad();
        this.help.showMessage('success', res.message);
        this.getListByPage(this.chooseSourceId,true);
      } else {
        this.help.showMessage('error', res.message);
      }
    });
  }

  UploadRow(id: string){

  }

}
