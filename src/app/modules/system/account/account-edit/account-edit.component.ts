import {Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { AccountService} from '../account.service';
import {Help} from '../../../../../utils/Help';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import { Account} from '../Account';
import {of} from 'rxjs';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.scss']
})
export class AccountEditComponent implements OnInit {


  validateForm: FormGroup;
  isLoading = false;
  obj: Account = new Account();

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private help: Help) {
  }

  ngOnInit() {
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
  }

  submitForm() {
    this.isLoading = true;
    this.accountService.saveOrUpdateData(this.obj).subscribe(res => {
      this.isLoading = false;
      if (res.success) {
        this.help.showMessage('success', res.message);
        this.help.back();
      }
    });
  }

}
