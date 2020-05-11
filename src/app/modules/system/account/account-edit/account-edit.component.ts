import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccountService} from '../account.service';
import {Help} from '../../../../../utils/Help';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {Account} from '../Account';
import {of} from 'rxjs';
import {StaffService} from '../../staff/staff.service';
import {Staff} from '../../staff/staff';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.scss']
})
export class AccountEditComponent implements OnInit {

  pageParams: any;
  validateForm: FormGroup;
  obj: Account = new Account();
  staffList: Staff[] = [];
  tempStaffList: Staff[];

  staffPageIndex = 1;
  staffPageSize = 10;
  staffParams: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private staffService: StaffService,
    public help: Help) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.pageParams = params;
    });
    this.route.queryParamMap.pipe(
      switchMap((params: ParamMap) => {
        if (params.get('id')) {
          return this.accountService.getById(params.get('id'));
        } else {
          return of(new Account());
        }
      })
    ).subscribe(d => {
      if (d.success) {
        this.obj = d.data;
      } else {
        this.obj = new Account();
      }
    });

    this.validateForm = this.formBuilder.group({

      id: [null, null],

      username: [null, [Validators.required]],

      password: [null, null],

      accountLocked: [null, [Validators.required]],

      accountExpired: [null, [Validators.required]],

      mobileLoginFlag: [null, [Validators.required]],

      staffId: [null, [Validators.required]],

      organizationId: [null, null],

      wxOpenid: [null, null],

      alipayOpenid: [null, null],

      email: [null, [Validators.required]],

      status: [null, [Validators.required]],

      remark: [null, null],

      created: [null, null],

      modified: [null, null],

      expiredDate: [null, null],

    });
    this.getStaffListByParams();

  }

  /*// searchChange$ = new BehaviorSubject('');

  onSearch(value: string): void {
    this.staffParams.keyword = value;
    this.staffList = [];
    this.getStaffListByPage(true);
    this.searchChange$.next(value);
  }*/

  getStaffListByParams(reset: boolean = false) {
    this.help.isLoading = true;
    this.staffService.getListByParams(this.staffParams).subscribe(data => {
      this.help.isLoading = false;
      console.log(data);
      if (data.success) {
        this.staffList = data.list;
      }
    }, err => {
      this.help.isLoading = false;
      this.help.showMessage('error', `请求出现错误: ${JSON.stringify(err)}`);
    });
  }

  submitForm() {
    this.help.isLoading = true;
    this.accountService.saveOrUpdateData(this.obj).subscribe(res => {
      this.help.isLoading = false;
      if (res.success) {
        this.help.showMessage('success', res.message);
        this.help.back();
      }
    });
  }

}
