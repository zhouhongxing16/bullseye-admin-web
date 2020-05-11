import {Component, ViewChild} from '@angular/core';
import {Help} from '../../../../../utils/Help';
import {OrganizationService} from '../organization.service';
import {NzFormatEmitEvent, NzTreeComponent} from 'ng-zorro-antd';
import {MenuService} from '../../menu/menu.service';
import {BaseListComponent} from '../../../../components/base-list/base-list.component';
import {Department} from '../../department/department';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss']
})
export class OrganizationListComponent extends BaseListComponent<Department> {
  @ViewChild('menuAuthTree') menuAuthTree: NzTreeComponent;
  drawerVisible = false;
  organizationId: string;
  nodes = [];
  selectMenus = [];
  defaultCheckedKeys = [];
  defaultSelectedKeys = [];

  constructor(private organizationService: OrganizationService, help: Help,
              route: ActivatedRoute, router: Router, private menuService: MenuService) {
    super(organizationService, help, route, router);
  }

  addMenu(organizationId: string): void {
    this.drawerVisible = true;
    this.help.isLoading = true;
    this.menuService.getOrganizationMenus({organizationId: organizationId}).subscribe(msg => {
      this.help.isLoading = false;
      if (msg.success) {
        this.organizationId = organizationId;
        this.getCheckedLeafMenus(organizationId);
        this.nodes = msg.list;
      }
    });
  }

  getSelectedNodeList() {
    this.selectMenus = [];
    const selectNodes = this.menuAuthTree.getCheckedNodeList();
    this.getChildLeafNode(selectNodes);
    this.getHalfCheckedNodeList();
  }

  getHalfCheckedNodeList() {
    const halfCheckedNodeList = this.menuAuthTree.getHalfCheckedNodeList();
    console.log(halfCheckedNodeList);
    halfCheckedNodeList.forEach(node => {
      this.selectMenus.push({
        organizationId: this.organizationId,
        menuId: node.origin.id,
        displayName: node.origin.title,
        status: 1,
        leaf: node.isLeaf
      });
    });
    console.log(this.selectMenus);
    this.saveOrganizationMenus();
  }

  saveOrganizationMenus() {
    this.help.isLoading = true;
    this.organizationService.saveOrganizationMenus(this.selectMenus).subscribe(res => {
      this.help.isLoading = false;
      if (res.success) {
        this.help.showMessage('success', res.message);
        this.close();
      }
    });
  }

  // 递归获取叶子节点
  getChildLeafNode(nodes: any) {
    nodes.forEach(node => {
      this.selectMenus.push({
        organizationId: this.organizationId,
        menuId: node.origin.id,
        displayName: node.origin.title,
        status: 1,
        isLeaf: node.isLeaf
      });
      if (!node.isLeaf && node.children.length > 0) {
        this.getChildLeafNode(node.children);
      }
    });
  }

  close(): void {
    this.drawerVisible = false;
  }

  getCheckedLeafMenus(organizationId: string): void {
    const that = this;
    this.organizationService.getCheckedLeafMenus({organizationId: organizationId, isLeaf: true}).subscribe(res => {
      if (res.success) {
        that.defaultCheckedKeys = [];
        res.list.forEach(item => {
          that.defaultCheckedKeys.push(item.menuId);
        });
        console.log(this.defaultCheckedKeys);
      }
    });
  }

  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event);
  }


}
