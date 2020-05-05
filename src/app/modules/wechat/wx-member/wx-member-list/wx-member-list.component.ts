import {Component, OnInit} from '@angular/core';
import {Help} from '../../../../../utils/Help';
import {WxMemberService} from '../wx-member.service';
import {WxMember} from '../wx-member';
import {WxAccount} from '../../wx-account/wx-account';
import {WxAccountService} from '../../wx-account/wx-account.service';

@Component({
  selector: 'app-wx-member-list',
  templateUrl: './wx-member-list.component.html',
  styleUrls: ['./wx-member-list.component.scss']
})
export class WxMemberListComponent implements OnInit {
  rows: WxMember[] = [];
  total = 0;
  pageIndex = 1;
  pageSize = 10;
  sortValue = null;
  sortKey = null;
  loading = false;
  wxAccounts: WxAccount[] = [];//可选的微信号
  chooseWxSourceId = '';//选中的微信sourceId

  /*constructor( wxMemberService: WxMemberService,  help: Help,  route: ActivatedRoute, router: Router) {
    super(wxMemberService, help, route, router);
  }*/

  constructor(private wxMemberService: WxMemberService,
              private help: Help,
              private wxAccountService: WxAccountService) {
  }

  ngOnInit() {
    this.getWxaccount();
  }

  getWxaccount() {
    this.wxAccountService.getListByParams({}).subscribe(data => {
      console.log(data.data);
      this.wxAccounts = data.data;
      this.chooseWxSourceId = this.wxAccounts[0].sourceId;
      this.getListByPage(true, this.chooseWxSourceId);
    }, err => {
    });
  }

  getListByPage(reset: boolean = false, sourceId: string) {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    this.chooseWxSourceId = sourceId
    this.wxMemberService.getListByPage(this.pageIndex, this.pageSize, {sourceId:sourceId}).subscribe(data => {
      this.loading = false;
      this.rows = data.rows;
      this.total = data.total;
    }, err => {
      this.loading = false;
      this.help.showMessage('error', `请求出现错误: ${JSON.stringify(err)}`);
    });
  }

}
