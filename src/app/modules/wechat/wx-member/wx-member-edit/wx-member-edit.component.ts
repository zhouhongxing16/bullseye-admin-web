import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Help} from '../../../../../utils/Help';
import {WxMemberService} from '../wx-member.service';
import {WxMember} from '../wx-member';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
  selector: 'app-wx-member-edit',
  templateUrl: './wx-member-edit.component.html',
  styleUrls: ['./wx-member-edit.component.scss']
})
export class WxMemberEditComponent implements OnInit {

  isLoading = false;
  obj: WxMember = new WxMember();
  pageParams: any;

  constructor(private formBuilder: FormBuilder,
              private wxMemberService: WxMemberService,
              private route: ActivatedRoute,
              private help: Help) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.pageParams = params;
    });
    this.route.queryParamMap.pipe(
      switchMap((params: ParamMap) => {
        if (params.get('id')) {
          return this.wxMemberService.getById(params.get('id'));
        } else {
          return of(new WxMember());
        }
      })
    ).subscribe(d => {
      if (d.success) {
        this.obj = d.data;
      } else {
        this.obj = new WxMember();
      }
      console.log(this.obj)
    });
  }

}
