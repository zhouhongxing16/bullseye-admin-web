import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Help} from '../../../../../utils/Help';
import {MenuService} from '../menu.service';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import {NzFormatEmitEvent, NzListComponent, NzTreeNode} from 'ng-zorro-antd';
import {Menu} from '../menu';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MenuAuth} from '../../menu-auth/menu-auth';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {

  @ViewChild('menuTree') menuTree: NzListComponent;
  dropdown: NzDropdownMenuComponent;
  // actived node
  activateNode: NzTreeNode;
  rightNode: NzTreeNode;
  nodes = [];
  drawerMenuVisible = false;
  drawerMenuAuthVisible = false;
  // 权限相关
  authList = [];
  total = 0;
  pageIndex = 0;
  pageSize = 10;

  menu: Menu = new Menu();
  menuAuth: MenuAuth = new MenuAuth();
  isLoading = false;
  validateForm: FormGroup;
  validateAuthForm: FormGroup;
  expandedRightMenuKeys = [];

  rows = [];

  // 构造函数里注入右键菜单的服务
  constructor(
    private formBuilder: FormBuilder,
    private menuService: MenuService,
    private help: Help,
    private nzDropdownService: NzContextMenuService,
  ) {
  }

  ngOnInit() {
    this.getAllMenus();
    this.validateForm = this.formBuilder.group({
      icon: [null, [Validators.required]],
      title: [null, [Validators.required]],
      path: [null, [Validators.required]],
      code: [null, [Validators.required]],
      sort: [null, [Validators.required]],
      status: [null, [Validators.required]],
      parentId: [null],
    });
    this.validateAuthForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      path: [null, [Validators.required]],
      code: [null, [Validators.required]],
      status: [null, [Validators.required]],
      menuId: [null, [Validators.required]],
    });
  }

  createMenu(): void {
    this.menu = new Menu();
    this.menu.parentId = this.rightNode.origin.id;
    this.expandedRightMenuKeys.push(this.rightNode.origin.id);
    this.drawerMenuVisible = true;
  }

  editMenu(): void {
    this.menu = this.help.copyObject(this.rightNode.origin, this.menu);
    this.drawerMenuVisible = true;
    // this.dropdown.close();
  }


  openFolder(data: NzTreeNode | NzFormatEmitEvent): void {
    // do something if u want
    if (data instanceof NzTreeNode) {
      data.isExpanded = !data.isExpanded;
    } else {
      const node = data.node;
      if (node) {
        node.isExpanded = !node.isExpanded;
      }
    }
  }
  getAllMenus() {
    this.menuService.getAllMenus().subscribe(msg => {
      if (msg.success) {
        this.nodes = msg.data;
      }
    });
  }

  deleteObject() {
    console.log(this.rightNode);
    if (this.rightNode.children.length > 0) {
      this.help.showMessage('warning', '请先删除子节点！');
    } else {
      this.menuService.deleteById(this.rightNode.origin.id).subscribe(msg => {
        if (msg.success) {
          this.getAllMenus();
          this.help.showMessage('success', msg.message);
        } else {
          this.help.showMessage('error', msg.message);
        }
      });
    }

  }

  activeNode(data: NzFormatEmitEvent): void {
    this.activateNode = data.node;
  }

  onChange($event: string): void {
    console.log($event);
  }

  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent, node: NzTreeNode): void {
    this.expandedRightMenuKeys = [];
    this.rightNode = node;
    this.expandedRightMenuKeys.push(node.origin.key);
    this.nzDropdownService.create($event, menu);
  }

  submitForm() {
    this.isLoading = true;
    this.menuService.saveOrUpdateData(this.menu).subscribe(res => {
      this.isLoading = false;
      if (res.success) {
        this.help.showMessage('success', res.message);
        this.drawerMenuVisible = false;
        this.getAllMenus();
      }
    });
  }


  getAuthListByPage(reset: boolean = false) {
    if (reset) {
      this.pageIndex = 1;
    }
    this.isLoading = true;

    this.menuService.getMenuAuthListByPage(this.pageIndex, this.pageSize, {menuId: this.menuAuth.menuId}).subscribe(data => {
      this.isLoading = false;
      this.rows = data.rows;
      this.total = data.total;
    }, err => {
      this.isLoading = false;
      this.help.showMessage('error', `请求出现错误: ${JSON.stringify(err)}`);
    });
  }

  deleteRow(id: string) {
    /*this.help.loading('删除中...');
    this.service.deleteById(id).subscribe(res => {
      if (res.success) {
        this.help.isLoading = false;
        this.help.showMessage('success', res.message);
        this.getListByPage(true);
      } else {
        this.help.showMessage('error', res.message);
      }
    });*/
  }


  saveOrUpdateMenuAuth() {
    let url = '/menuauth/create';
    if (this.menuAuth.id) {
      url = '/menuauth/update';
    }
    const menuId = this.menuAuth.menuId;
    this.help.post(url, this.menuAuth).subscribe(res => {
      this.isLoading = false;
      if (res.success) {
        this.help.showMessage('success', res.message);
        this.help.clearObject(this.menuAuth);
        this.menuAuth.menuId = menuId;
        this.getAuthListByPage(true);
      }
    });
  }

  // 菜单权限相关
  addAuth() {
    this.menuAuth.menuId = this.rightNode.origin.id;
    this.getAuthListByPage(true);
    this.drawerMenuAuthVisible = true;
    // this.dropdown.close();
  }

  setData(id) {
    for (const r of this.rows) {
      if (r.id === id) {
        console.log(r);
        this.menuAuth = r;
        break;
      }
    }
  }

  close(): void {
    this.drawerMenuVisible = false;
    this.drawerMenuAuthVisible = false;
  }

  onAuthMenuChange($event: string): void {
    if (!this.help.isEmpty($event)) {
      this.rightNode.origin.id = $event;
      this.getAuthListByPage(true);
    }
  }
}
