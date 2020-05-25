import {Component} from '@angular/core';
import {LoginRecord} from '../LoginRecord';
import {LoginRecordService} from '../login-record.service';
import {Help} from '../../../../../utils/Help';
import {BaseListComponent} from '../../../../components/base-list/base-list.component';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login-record-list',
  templateUrl: './login-record-list.component.html',
  styleUrls: ['./login-record-list.component.scss']
})
export class LoginRecordListComponent extends BaseListComponent<Account> {

  rows: LoginRecord[] = [];

  constructor(private loginRecordService: LoginRecordService, public help: Help, route: ActivatedRoute, router: Router) {
    super(loginRecordService, help, route, router);
  }


}
