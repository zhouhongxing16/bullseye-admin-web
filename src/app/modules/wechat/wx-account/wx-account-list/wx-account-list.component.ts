import {Component} from '@angular/core';
import {Help} from '../../../../../utils/Help';
import {WxAccountService} from '../wx-account.service';
import {WxAccount} from '../wx-account';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseListComponent} from '../../../../components/base-list/base-list.component';

@Component({
  selector: 'app-wx-account-list',
  templateUrl: './wx-account-list.component.html',
  styleUrls: ['./wx-account-list.component.scss']
})
export class WxAccountListComponent extends BaseListComponent<WxAccount> {
  // 方法开始全选多选
  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  listOfDisplayData = [];
  mapOfCheckedId = {};


  constructor( wxAccountService: WxAccountService,  help: Help,  route: ActivatedRoute, router: Router) {
    super(wxAccountService, help, route, router);
  }

// 多选删除
  deleteOfChecked() {
    const ids = [];
    for (const p1 in this.mapOfCheckedId) {
      if (this.mapOfCheckedId.hasOwnProperty(p1) && this.mapOfCheckedId[p1]) {
        ids.push(p1);
      }
    }
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
}
