import {Component} from '@angular/core';
import {WxMenuService} from '../wx-menu.service';
import {Help} from '../../../../../utils/Help';
import {WxMenu} from '../wx-menu';
import {WxAccount} from '../../wx-account/wx-account';
import {WxAccountService} from '../../wx-account/wx-account.service';
import {BaseListComponent} from '../../../../components/base-list/base-list.component';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-wx-menu-list',
  templateUrl: './wx-menu-list.component.html',
  styleUrls: ['./wx-menu-list.component.scss']
})
export class WxMenuListComponent extends BaseListComponent<WxMenu> {

  wxAccounts: WxAccount[] = [];
  expand: true;
  mapOfExpandedData = {};
  chooseWxSourceId = '';


  constructor(public wxMenuService: WxMenuService, public wxAccountService: WxAccountService,
              public help: Help, route: ActivatedRoute, router: Router) {
    super(wxMenuService, help, route, router);
  }


  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {
    this.initAuthData();
    this.getWxAccount();
  }

  getWxAccount() {
    this.wxAccountService.getListByParams({}).subscribe(res => {
      this.wxAccounts = res.list;
      this.getWxMenu(this.wxAccounts[0].sourceId);
    }, err => {

    });
  }

  getWxMenu(sourceId: string) {
    if (sourceId) {
      this.chooseWxSourceId = sourceId;
      this.help.isLoading = true;
      this.wxMenuService.getWxMenu(sourceId).subscribe(data => {
        this.help.isLoading = false;
        this.rows = data.wxMenu;
        this.rows.forEach(item => {
          this.mapOfExpandedData[item.id] = this.convertTreeToList(item);
        });
      }, err => {
        this.help.isLoading = false;
        this.help.showMessage('error', `请求出现错误: ${JSON.stringify(err)}`);
      });
    }
  }


  collapse(array: WxMenu[], data: WxMenu, $event: boolean): void {
    if ($event === false) {
      if (data.children) {
        data.children.forEach(d => {
          const target = array.find(a => a.id === d.id);
          target.expand = false;
          this.collapse(array, target, false);
        });
      } else {
        return;
      }
    }
  }

  convertTreeToList(root: object): WxMenu[] {
    const stack = [];
    const array = [];
    const hashMap = {};
    stack.push({...root, level: 0, expand: false});

    while (stack.length !== 0) {
      const node = stack.pop();
      this.visitNode(node, hashMap, array);
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          stack.push({...node.children[i], level: node.level + 1, expand: false, parent: node});
        }
      }
    }
    return array;
  }

  visitNode(node: WxMenu, hashMap: object, array: WxMenu[]): void {
    if (!hashMap[node.id]) {
      hashMap[node.id] = true;
      array.push(node);
    }
  }


  deleteRow(id: string) {
    this.help.loading('删除中...');
    this.wxMenuService.deleteById(id).subscribe(res => {
      if (res.success) {
        this.help.stopLoad();
        this.help.showMessage('success', res.message);
        this.getWxMenu(this.chooseWxSourceId);
      } else {
        this.help.showMessage('error', res.message);
      }
    });
  }

  createWxMenu() {
    this.help.isLoading = true;
    this.wxMenuService.createWxMenu(this.chooseWxSourceId).subscribe(res => {
      this.help.isLoading = false;
      if (res.success) {
        this.help.isLoading = false;
        this.help.showMessage('success', res.message);
        this.getWxMenu(this.chooseWxSourceId);
      } else {
        this.help.showMessage('error', res.message);
      }
    });
  }

}
