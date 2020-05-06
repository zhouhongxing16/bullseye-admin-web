import {Component, ViewChild} from '@angular/core';
import {Help} from '../../../../../utils/Help';
import {RoleService} from '../role.service';
import {Role} from '../role';
import {NzFormatEmitEvent, NzTreeComponent} from 'ng-zorro-antd';
import {RoleMenuAuthService} from '../../role-menu-auth/role-menu-auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseListComponent} from '../../../../components/base-list/base-list.component';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent extends BaseListComponent<Role> {

  @ViewChild('roleMenuAuthTree') roleMenuAuthTree: NzTreeComponent;
  @ViewChild('roleMenuFunctionTree') roleMenuFunctionTree: NzTreeComponent;
  rows: Role[] = [];
  visible = false;
  roleId: string;
  menuNodes = [];

  selectMenus = [];
  selectMenuAuthMenus = [];
  roleMenuCheckedKeys = [];
  roleMenuSelectedKeys = [];

  roleMenuAuthCheckedKeys = [];
  roleMenuAuthVisible = false;
  menuAuthNodes = [];

  constructor(private roleService: RoleService, private roleMenuAuthService: RoleMenuAuthService,
              help: Help, route: ActivatedRoute, router: Router) {
    super(roleService, help, route, router);
  }


  saveRoleMenus() {
    this.help.isLoading = true;
    console.log(this.selectMenus);
    this.roleService.saveRoleMenus(this.selectMenus).subscribe(res => {
      this.help.isLoading = false;
      if (res.success) {
        this.help.showMessage('success', res.message);
        this.close();
      }
    });
  }

  addMenu(roleId: string): void {
    this.visible = true;
    this.roleService.getOrganizationAuthMenus({roleId: roleId}).subscribe(msg => {
      if (msg.success) {
        this.roleId = roleId;
        this.getCheckedLeafMenus(roleId);
        this.menuNodes = msg.data;
      }
    });
  }

  getSelectedMenuNodeList() {
    this.selectMenus = [];
    const selectNodes = this.roleMenuAuthTree.getCheckedNodeList();
    this.getChildMenuLeafNode(selectNodes);
    this.getHalfCheckedNodeList();
  }

  getHalfCheckedNodeList() {
    const halfCheckedNodeList = this.roleMenuAuthTree.getHalfCheckedNodeList();
    halfCheckedNodeList.forEach(node => {
      this.selectMenus.push({
        roleId: this.roleId,
        menuId: node.origin.id,
        status: 1,
        isLeaf: node.isLeaf
      });
    });
    this.saveRoleMenus();
  }

  // 递归获取叶子节点
  getChildMenuLeafNode(nodes: any) {
    nodes.forEach(node => {
      this.selectMenus.push({
        roleId: this.roleId,
        menuId: node.origin.id,
        status: 1,
        isLeaf: node.isLeaf
      });
      if (!node.isLeaf && node.children.length > 0) {
        this.getChildMenuLeafNode(node.children);
      }
    });
  }

  close(): void {
    this.visible = false;
    this.roleMenuAuthVisible = false;
  }

  getCheckedLeafMenus(roleId: string): void {
    const that = this;
    this.roleService.getCheckedLeafMenus({roleId: roleId, isLeaf: true}).subscribe(res => {
      if (res.success) {
        that.roleMenuCheckedKeys = [];
        res.data.forEach(item => {
          that.roleMenuCheckedKeys.push(item.menuId);
        });
      }
    });
  }

  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event);
  }

  // 打开角色功能授权页面
  showRoleMenuAuth(roleId: string) {
    this.roleMenuAuthVisible = true;
    this.menuAuthNodes = [];
    this.roleId = roleId;
    this.getMenuAndAuthByRoleId(roleId);
  }

  // 获取角色菜单和功能
  getMenuAndAuthByRoleId(roleId: string) {
    this.roleMenuAuthService.getMenuAndAuthByRoleId(roleId).subscribe(msg => {
      if (msg.success) {
        this.menuAuthNodes = msg.data;
        this.getRoleMenuAuthCheckedKeys(roleId);
      }
    });
  }

  getRoleMenuAuthCheckedKeys(roleId: string) {
    const that = this;
    this.roleMenuAuthService.getRoleMenuAuthCheckedData({roleId: roleId}).subscribe(res => {
      if (res.success) {
        that.roleMenuAuthCheckedKeys = [];
        res.data.forEach(item => {
          that.roleMenuAuthCheckedKeys.push(item.menuAuthId);
        });
      }
    });
  }

  getSelectedMenuAuthNodeList() {
    const selectMenuAuthNodes = this.roleMenuFunctionTree.getCheckedNodeList();
    console.log(this.selectMenuAuthMenus);
    this.getChildMenuAuthLeafNode(selectMenuAuthNodes);
    console.log(this.selectMenuAuthMenus);
    this.saveRoleMenuAuth();
  }

  // 递归获取菜单功能授权叶子节点
  getChildMenuAuthLeafNode(nodes: any) {
    console.log(nodes);
    nodes.forEach(node => {
      if (node.isLeaf && node.origin.type === 'menuAuth') {
        this.selectMenuAuthMenus.push({
          roleId: this.roleId,
          menuAuthId: node.origin.id,
          status: 1,
          isLeaf: node.isLeaf
        });
      }
      if (!node.isLeaf && node.children.length > 0) {
        this.getChildMenuAuthLeafNode(node.children);
      }
    });
  }

  saveRoleMenuAuth() {
    this.help.isLoading = true;
    this.roleMenuAuthService.createRoleMenuAuth(this.selectMenuAuthMenus).subscribe(res => {
      this.help.isLoading = false;
      if (res.success) {
        this.help.showMessage('success', res.message);
        this.close();
      }
    });
  }
}
