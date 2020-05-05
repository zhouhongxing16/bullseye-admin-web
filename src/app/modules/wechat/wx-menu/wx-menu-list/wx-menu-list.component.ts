import {Component, OnInit} from '@angular/core';
import {WxMenuService} from '../wx-menu.service';
import {Help} from '../../../../../utils/Help';
import {WxMenu} from '../wx-menu';
import {WxAccount} from '../../wx-account/wx-account';
import {WxAccountService} from '../../wx-account/wx-account.service';

@Component({
  selector: 'app-wx-menu-list',
  templateUrl: './wx-menu-list.component.html',
  styleUrls: ['./wx-menu-list.component.scss']
})
export class WxMenuListComponent implements OnInit {

  rows: WxMenu[] = [];
  wxAccounts: WxAccount[] = [];
  expand: true;
  loading = false;
  mapOfExpandedData = {};
  chooseWxSourceId = '';

  constructor(private wxMenuService: WxMenuService,
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
      this.getWxMenu(this.wxAccounts[0].sourceId);
    }, err => {

    });
  }

  getWxMenu(sourceId:string) {
    if (sourceId){
      this.chooseWxSourceId = sourceId;
      this.loading = true;
      this.wxMenuService.getWxMenu(sourceId).subscribe(data => {
        this.loading = false;
        this.rows = data.wxMenu;
        this.rows.forEach(item => {
          this.mapOfExpandedData[ item.id ] = this.convertTreeToList(item);
        });
      }, err => {
        this.loading = false;
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
    stack.push({ ...root, level: 0, expand: false });

    while (stack.length !== 0) {
      const node = stack.pop();
      this.visitNode(node, hashMap, array);
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          stack.push({ ...node.children[ i ], level: node.level + 1, expand: false, parent: node });
        }
      }
    }
    return array;
  }

  visitNode(node: WxMenu, hashMap: object, array: WxMenu[]): void {
    if (!hashMap[ node.id ]) {
      hashMap[ node.id ] = true;
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
    this.loading = true;
    this.wxMenuService.createWxMenu(this.chooseWxSourceId).subscribe(res => {
      this.loading = false;
      if (res.success) {
        this.help.stopLoad();
        this.help.showMessage('success', res.message);
        this.getWxMenu(this.chooseWxSourceId);
      } else {
        this.help.showMessage('error', res.message);
      }
    });
  }

}
