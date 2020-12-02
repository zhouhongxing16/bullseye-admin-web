import {Component, OnInit} from '@angular/core';
import {Help} from '../../../../../utils/Help';
import {WxAccountService} from '../../wx-account/wx-account.service';
import {ActivatedRoute, Router} from '@angular/router';
import {WxBaseListComponent} from '../../../../components/wxbase-list/wxbase-list.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd';
import {WxTemplate} from '../wx-template';
import {WxTemplateService} from '../wx-template.service';

@Component({
  selector: 'app-wx-template-list',
  templateUrl: './wx-template-list.component.html',
  styleUrls: ['./wx-template-list.component.scss']
})
export class WxTemplateListComponent extends WxBaseListComponent<WxTemplate> {

  loading = false;
  obj: WxTemplate = new WxTemplate();
  validateForm: FormGroup;

  constructor(private wxTemplateService: WxTemplateService,
              wxAccountService: WxAccountService,
              help: Help,
              route: ActivatedRoute,
              router: Router,
              private message: NzMessageService,
              private formBuilder: FormBuilder) {
    super(wxTemplateService, help, route, router, wxAccountService);
  }

  ngOnInit() {
    this.initAuthData();
    this.getWxAccount();
    this.validateForm = this.formBuilder.group({
      name: [null, [Validators.required]]
    });
  }

}
