import {Component, OnInit} from '@angular/core';
import {WxReplyService} from '../wx-reply.service';
import {Help} from '../../../../../utils/Help';
import {WxReply} from '../wx-reply';
import {WxAccountService} from '../../wx-account/wx-account.service';
import {WxBaseListComponent} from '../../../../components/wxbase-list/wxbase-list.component';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-wx-reply-list',
  templateUrl: './wx-reply-list.component.html',
  styleUrls: ['./wx-reply-list.component.scss']
})
export class WxReplyListComponent extends WxBaseListComponent<WxReply> {
  rows: WxReply[] = [];
  total = 0;
  pageIndex = 1;
  pageSize = 10;
  loading = false;


  constructor(private wxReplyService: WxReplyService, wxAccountService: WxAccountService, help: Help,
              route: ActivatedRoute, router: Router) {
    super(wxReplyService, help, route, router, wxAccountService);
  }

  deleteRow(id: string) {
    this.help.loading('删除中...');
    this.wxReplyService.deleteById(id).subscribe(res => {
      if (res.success) {
        this.help.stopLoad();
        this.help.showMessage('success', res.message);
      } else {
        this.help.showMessage('error', res.message);
      }
    });
  }

}
