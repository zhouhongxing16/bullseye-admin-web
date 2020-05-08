import {Component} from '@angular/core';
import {Help} from '../../../../../utils/Help';
import {AccountService} from '../account.service';
import {BaseListComponent} from '../../../../components/base-list/base-list.component';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent extends BaseListComponent<Account> {
  rows: Account[] = [];
  roles = [];
  drawerVisible = false;
  listOfSelectedRole = [];

  accountId = null;

  constructor(private accountService: AccountService, public help: Help, route: ActivatedRoute, router: Router) {
    super(accountService, help, route, router);
  }


  close(): void {
    this.drawerVisible = false;
  }

  saveSelectedRoles(): void {
    console.log(this.listOfSelectedRole);
    this.accountService.saveAccountRoles({
      roleIds: this.listOfSelectedRole.join(','),
      accountId: this.accountId
    }).subscribe(res => {
      this.help.isLoading = false;
      if (res.success) {
        this.help.showMessage('success', res.message);
        this.drawerVisible = false;
      } else {
        this.help.showMessage('warning', res.message);
      }
    });

  }

  isNotSelectedRole(value: string): boolean {
    return this.listOfSelectedRole.indexOf(value) === -1;
  }

  openDrawer(id: string) {
    this.accountId = id;
    this.getAllRoles();
    this.getRolesByAccountId(id);
  }

  getAllRoles() {
    const that = this;
    this.drawerVisible = true;
    this.help.isLoading = true;
    this.accountService.getAllRoles(null).subscribe(res => {
      this.help.isLoading = false;
      if (res.success) {
        that.roles = [];
        that.roles = res.data;
      } else {
        this.help.showMessage('error', res.message);
      }
    });
  }

  getRolesByAccountId(id: string) {
    const that = this;
    this.drawerVisible = true;
    this.accountService.getRolesByAccountId(id).subscribe(res => {
      if (res.success) {
        that.listOfSelectedRole = [];
        res.data.forEach(r => {
          that.listOfSelectedRole.push(r.id);
        });
      } else {
        this.help.showMessage('error', res.message);
      }
    });
  }
}
