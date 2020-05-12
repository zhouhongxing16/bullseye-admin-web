import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StaffService} from '../staff.service';
import {Help} from '../../../../../utils/Help';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {UploadFile} from 'ng-zorro-antd';
import {Staff} from '../staff';


@Component({
  selector: 'app-staff-edit',
  templateUrl: './staff-edit.component.html',
  styleUrls: ['./staff-edit.component.scss']
})
export class StaffEditComponent implements OnInit {

  validateForm: FormGroup;
  obj: Staff = new Staff();
  constructor(
    private formBuilder: FormBuilder,
    private staffService: StaffService,
    private route: ActivatedRoute,
    public help: Help) {
  }

  ngOnInit() {
    this.route.queryParamMap.pipe(
      switchMap((params: ParamMap) => {
        if (params.get('id')) {
          return this.staffService.getById(params.get('id'));
        } else {
          return of(new Staff());
        }
      })
    ).subscribe(d => {
      if (d.success) {
        this.obj = d.data;
      } else {
        this.obj = new Staff();
      }
    });

    this.validateForm = this.formBuilder.group({

      id: [null, null],

      serialNo: [null, [Validators.required]],

      name: [null, [Validators.required]],

      genderId: [null, [Validators.required]],

      mobile: [null, [Validators.required]],

      email: [null, [Validators.required]],

      avatar: [null, null],

      departmentId: [null, [Validators.required]],

      birthday: [null, [Validators.required]],

      academicId: [null, null],

      degreeId: [null, null],

      positionId: [null, null],

      titleId: [null, null],

      typeId: [null, null],

      identifyTypeId: [null, null],

      identifyNo: [null, null],

      status: [null, [Validators.required]],

      birthProvinceId: [null, null],

      birthCityId: [null, null],

      policy: [null, null],

      nationId: [null, null],

      joinDate: [null, null],

      remark: [null, null],
    });
  }

  handleChange(info: { file: UploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.help.isLoading = true;
        break;
      case 'done':
        this.help.isLoading = false;
        // tslint:disable-next-line:no-non-null-assertion
        this.help.getBase64(info.file!.originFileObj!, (img: string) => {
          this.obj.avatar = info.file.response.data.fullFilePath;
        });
        break;
      case 'error':
        this.help.showMessage('error', '网络错误！');
        this.help.isLoading = false;
        break;
    }
  }

  submitForm() {
    this.help.isLoading = true;
    this.obj.birthday = this.help.fmtDate(this.obj.birthday, 'yyyy-MM-dd');
    this.obj.joinDate = this.help.fmtDate(this.obj.joinDate, 'yyyy-MM-dd');
    this.staffService.saveOrUpdateData(this.obj).subscribe(res => {
      this.help.isLoading = false;
      if (res.success) {
        this.help.showMessage('success', res.message);
        this.help.back();
      }
    });
  }

}
