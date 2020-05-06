import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Help} from '../../../../../utils/Help';
import {WxReplyService} from '../wx-reply.service';
import {WxReply} from '../wx-reply';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {WxMaterialService} from '../../wx-material/wx-material.service';


@Component({
  selector: 'app-wx-reply-edit',
  templateUrl: './wx-reply-edit.component.html',
  styleUrls: ['./wx-reply-edit.component.scss']
})
export class WxReplyEditComponent implements OnInit {
  //富文本相关---
  @Input() content;

  @Output() public contentChange = new EventEmitter();

  public config = {
    language: 'zh-cn',
  };


  //--

  validateForm: FormGroup;
  isLoading = false;
  obj: WxReply = new WxReply();
  chooseSourceId;
  wxMaterialList;

  constructor(private formBuilder: FormBuilder,
              private wxReplyService: WxReplyService,
              private wxMaterialService: WxMaterialService,
              private route: ActivatedRoute,
              private help: Help) {
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        if (params.get('id')) {
          return this.wxReplyService.getById(params.get('id'));
        } else {
          this.chooseSourceId = params.get('sourceId');
          return of(new WxReply());
        }
      })
    ).subscribe(d => {
      if (d.success) {
        this.obj = d.data;
      } else {
        this.obj = new WxReply();
      }
      if(this.chooseSourceId){
        this.obj.sourceId = this.chooseSourceId;
      }
      if(this.obj.keyType == 'news'){
        this.getMediaId()
      }
    });
    this.validateForm = this.formBuilder.group({
      keyWord: [null, [Validators.required]],
      keyType: [null, [Validators.required]],
      keyValue: [null, [Validators.required]],
      status: [null, [Validators.required]],
      mediaId: [null, [Validators.required]],
      url: [null, [Validators.required]],
    });
  }

  getMediaId (){
    this.wxMaterialService.getEverMaterialBySourceId(this.obj.sourceId).subscribe(res =>{
      this.wxMaterialList = res
      console.log(res)
    })
  }

  submitForm() {
    this.isLoading = true;
    this.wxReplyService.saveOrUpdateData(this.obj).subscribe(res => {
      this.isLoading = false;
      if (res.success) {
        this.help.showMessage('success', res.message);
      }
    });
  }

}
