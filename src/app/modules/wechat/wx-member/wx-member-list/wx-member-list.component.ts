import {Component} from '@angular/core';
import {Help} from '../../../../../utils/Help';
import {WxMemberService} from '../wx-member.service';
import {WxMember} from '../wx-member';
import {WxAccount} from '../../wx-account/wx-account';
import {WxAccountService} from '../../wx-account/wx-account.service';
import {BaseListComponent} from "../../../../components/base-list/base-list.component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-wx-member-list',
  templateUrl: './wx-member-list.component.html',
  styleUrls: ['./wx-member-list.component.scss']
})
export class WxMemberListComponent extends BaseListComponent<WxMember> {
  wxAccounts: WxAccount[] = [];//可选的微信号
  chooseWxSourceId = '';//选中的微信sourceId

  constructor( wxMemberService: WxMemberService,public wxAccountService: WxAccountService, help: Help,  route: ActivatedRoute, router: Router) {
    super(wxMemberService, help, route, router);
  }

  ngOnInit(){
    this.getWxaccount();
  }

  getWxaccount() {
    this.wxAccountService.getListByParams({}).subscribe(data => {
      console.log(data.data);
      this.wxAccounts = data.data;
      this.chooseWxSourceId = this.wxAccounts[0].sourceId;
    }, err => {
    });
  }


}
