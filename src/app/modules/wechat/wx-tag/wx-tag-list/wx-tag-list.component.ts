import {Component, OnInit} from '@angular/core';
import {Help} from '../../../../../utils/Help';
import {WxAccountService} from '../../wx-account/wx-account.service';
import {ActivatedRoute, Router} from '@angular/router';
import {WxBaseListComponent} from '../../../../components/wxbase-list/wxbase-list.component';
import {WxTag} from '../wx-tag';
import {WxTagService} from '../wx-tag.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd';
import {WxMemberService} from '../../wx-member/wx-member.service';

@Component({
  selector: 'app-wx-tag-list',
  templateUrl: './wx-tag-list.component.html',
  styleUrls: ['./wx-tag-list.component.scss']
})
export class WxTagListComponent extends WxBaseListComponent<WxTag> {

  rows: WxTag[] = [];
  total = 0;
  pageIndex = 1;
  pageSize = 10;
  loading = false;

  isVisible = false;
  obj: WxTag = new WxTag();
  validateForm: FormGroup;

  userTagIsVisible = false;

  memberLoading = false;
  memberPageIndex = 1;
  memberPageSize = 10;
  memberTotal = 0;
  memberParams: any = {
    keyword: '',
    sourceId: this.params.sourceId
  };
  memberRows: any = [];

  constructor(private wxTagService: WxTagService,
              wxAccountService: WxAccountService,
              help: Help,
              route: ActivatedRoute,
              router: Router,
              private message: NzMessageService,
              private formBuilder: FormBuilder,
              private wxMemberService: WxMemberService) {
    super(wxTagService, help, route, router, wxAccountService);
  }

  ngOnInit() {
    this.initAuthData();
    this.getWxAccount();
    this.validateForm = this.formBuilder.group({
      name: [null, [Validators.required]]
    });
  }

  showModal() {
    this.obj.id = null;
    this.obj.name = '';
    this.obj.tagId = '';
    this.isVisible = true;
  }

  handleOk() {
    this.obj.sourceId = this.params.sourceId;
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    this.wxTagService.saveOrUpdateData(this.obj).subscribe(res => {
      if (res.success) {
        this.message.success(res.message);
        this.isVisible = false;
        this.getListByPage();
      } else {
        this.message.error(res.message);
      }
    });
  }

  handleCancel() {
    this.isVisible = false;
  }

  edit(data: any) {
    this.obj.id = data.id;
    this.obj.name = data.name;
    this.obj.tagId = data.tagId;
    this.isVisible = true;
  }

  userTagModelShow() {
    this.userTagIsVisible = true;
    this.memberParams.sourceId = this.params.sourceId;
    this.getMemberListByPage(true);
  }

  userTaghandleCancel() {
    this.userTagIsVisible = false;
  }

  userTaghandleOk() {

  }

  getMemberListByPage(reset: boolean = false) {
    if (reset) {
      this.memberPageIndex = 1;
    }
    this.memberLoading = true;
    this.wxMemberService.getListByPage(this.memberPageIndex, this.memberPageSize, this.memberParams).subscribe(data => {
      this.memberLoading = false;
      this.memberRows = data.page.list;
      this.memberTotal = data.page.total;
    }, err => {
      this.memberLoading = false;
      this.help.showMessage('error', `请求出现错误: ${JSON.stringify(err)}`);
    });
  }

}
