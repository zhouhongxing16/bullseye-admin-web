import {Component} from '@angular/core';
import {Help} from '../../../../../utils/Help';
import {WxMemberService} from '../wx-member.service';
import {WxMember} from '../wx-member';
import {WxAccount} from '../../wx-account/wx-account';
import {WxAccountService} from '../../wx-account/wx-account.service';
import {ActivatedRoute, Router} from '@angular/router';
import {WxBaseListComponent} from '../../../../components/wxbase-list/wxbase-list.component';

@Component({
  selector: 'app-wx-member-list',
  templateUrl: './wx-member-list.component.html',
  styleUrls: ['./wx-member-list.component.scss']
})
export class WxMemberListComponent extends WxBaseListComponent<WxMember> {
  // 可选的微信号
  wxAccounts: WxAccount[] = [];

  constructor(wxMemberService: WxMemberService, wxAccountService: WxAccountService,
              help: Help, route: ActivatedRoute, router: Router) {
    super(wxMemberService, help, route, router, wxAccountService);
  }

}
