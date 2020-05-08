import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Help} from '../../../../../utils/Help';
import {WxMenuService} from '../wx-menu.service';
import {WxMenu} from '../wx-menu';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {WxMaterialService} from '../../wx-material/wx-material.service';

@Component({
  selector: 'app-wx-menu-edit',
  templateUrl: './wx-menu-edit.component.html',
  styleUrls: ['./wx-menu-edit.component.scss']
})
export class WxMenuEditComponent implements OnInit {

  validateForm: FormGroup;
  obj: WxMenu = new WxMenu();
  type: string;
  wxMaterialList;

  constructor(private formBuilder: FormBuilder,
              private wxMenuService: WxMenuService,
              private wxMaterialService: WxMaterialService,
              private route: ActivatedRoute,
              public help: Help) {
  }

  ngOnInit() {
    this.type = this.route.snapshot.queryParams['type'];
    this.route.queryParamMap.pipe(
      switchMap((params: ParamMap) => {
        if (params.get('id')) {
          return this.wxMenuService.getById(params.get('id'));
        } else {
          return of(new WxMenu());
        }
      })
    ).subscribe(d => {
      if (this.type === 'addOne') {
        this.obj = new WxMenu();
        this.obj.parentId = '0';
        this.obj.sourceId = this.route.snapshot.queryParams['sourceId'];
      } else if (this.type === 'addTwo') {
        this.obj = new WxMenu();
        this.obj.parentId = d.data.id;
        this.obj.sourceId = d.data.sourceId;
      } else if (this.type === 'edit') {
        this.obj = d.data;
      }
      console.log(this.obj);
    });

    this.validateForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      type: [null, [Validators.required]],
      author: [null, [Validators.required]],
      sort: [null, [Validators.required]],
      mediaId: [null],
      appId: [null],
      pagePath: [null],
      remark: [null],
      parentId: [null],
      sourceId: [null],
      id: [null],
      keyValue: [null],
      url: [null]
    });
  }

  getMediaId() {
    this.wxMaterialService.getEverMaterialBySourceId(this.obj.sourceId).subscribe(res => {
      this.wxMaterialList = res;
      console.log(res);
    });
  }

  submitForm() {
    this.help.loading();
    this.wxMenuService.saveOrUpdateData(this.obj).subscribe(res => {
      this.help.stopLoad();
      if (res.success) {
        this.help.showMessage('success', res.message);
        this.help.back();
      }
    });
  }

}
