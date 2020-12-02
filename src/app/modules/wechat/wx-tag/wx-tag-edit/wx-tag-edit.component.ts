import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Help} from '../../../../../utils/Help';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {WxTag} from '../wx-tag';
import {WxTagService} from '../wx-tag.service';


@Component({
  selector: 'app-wx-tag-edit',
  templateUrl: './wx-tag-edit.component.html',
  styleUrls: ['./wx-tag-edit.component.scss']
})
export class WxTagEditComponent implements OnInit {

  validateForm: FormGroup;
  isLoading = false;
  obj: WxTag = new WxTag();
  chooseSourceId;

  constructor(private formBuilder: FormBuilder,
              private wxTagService: WxTagService,
              private route: ActivatedRoute,
              private help: Help) {
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        if (params.get('id')) {
          return this.wxTagService.getById(params.get('id'));
        } else {
          this.chooseSourceId = params.get('sourceId');
          return of(new WxTag());
        }
      })
    ).subscribe(d => {
      if (d.success) {
        this.obj = d.data;
      } else {
        this.obj = new WxTag();
      }
      if (this.chooseSourceId) {
        this.obj.sourceId = this.chooseSourceId;
      }
    });
    this.validateForm = this.formBuilder.group({
      name: [null, [Validators.required]],
    });
  }

  submitForm() {
    this.isLoading = true;
    this.wxTagService.saveOrUpdateData(this.obj).subscribe(res => {
      this.isLoading = false;
      if (res.success) {
        this.help.showMessage('success', res.message);
      }
    });
  }

}
