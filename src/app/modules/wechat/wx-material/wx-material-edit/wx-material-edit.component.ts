import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WxMaterialService} from "../wx-material.service";
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Help} from '../../../../../utils/Help';
import {WxMaterial} from "../wx-material";
import {switchMap} from 'rxjs/operators';
import {Observable, Observer, of} from 'rxjs';
import {UploadFile} from 'ng-zorro-antd';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-wx-material-edit',
  templateUrl: './wx-material-edit.component.html',
  styleUrls: ['./wx-material-edit.component.scss']
})
export class WxMaterialEditComponent implements OnInit {

  validateForm: FormGroup;
  isLoading = false;
  obj: WxMaterial = new WxMaterial();
  chooseWxSourceId: any;

  thumbUrl: string;
  pageParams: any;

  constructor(private formBuilder: FormBuilder,
              private wxMaterialService: WxMaterialService,
              private route: ActivatedRoute,
              private help: Help) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.pageParams = params;
    });
    this.route.queryParamMap.pipe(
      switchMap((params: ParamMap) => {
        if (params.get('id')) {
          return this.wxMaterialService.getById(params.get('id'));
        } else {
          return of(new WxMaterial());
        }
      })
    ).subscribe(d => {
      if (d.success) {
        this.obj = d.data;
        if (this.obj.thumbFileId !=null && this.obj.thumbFileId.length > 0) {
          this.wxMaterialService.getAttachFileById(this.obj.thumbFileId).subscribe(data => {
            if (data.success && data.data.thumbnail.length > 0) {
              this.thumbUrl = environment.SERVER_URL + data.data.thumbnail;
            }
          });
        }
      } else {
        this.obj = new WxMaterial();
      }
    });

    if (this.chooseWxSourceId) {
      this.obj.sourceId = this.chooseWxSourceId;
    }

    this.validateForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      type: [null, [Validators.required]],
      title: [null, [Validators.required]],
      showCoverPic: [null, [Validators.required]],
      author: [null],
      digest: [null],
      content: [null],
      contentSourceUrl: [null],
      needOpenComment: [null],
      onlyFansCanComment: [null],
      introduction: [null],
      thumbMediaId: [null],
    });
  }

  beforeUpload = (file: File) => {
    return new Observable((observer: Observer<boolean>) => {
      const isJPG = file.type === 'image/jpeg';
      if (!isJPG) {
        this.help.showMessage('error', '只能上传 JPG 文件');
        observer.complete();
        return;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.help.showMessage('error', '文件大小不能超过2MB!');
        observer.complete();
        return;
      }
      // check height
      this.checkImageDimension(file).then(dimensionRes => {
        if (!dimensionRes) {
          this.help.showMessage('error', '分辨率300x300以上');
          observer.complete();
          return;
        }

        observer.next(isJPG && isLt2M && dimensionRes);
        observer.complete();
      });
    });
  }

  handleChange(info: { file: UploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.isLoading = true;
        break;
      case 'done':
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.isLoading = false;
          this.thumbUrl = info.file.thumbUrl
          this.obj.thumbFileId = info.file.response.data.id;
        });
        break;
      case 'error':
        this.help.showMessage('error', '网络错误！');
        this.isLoading = false;
        break;
    }
  }

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  private checkImageDimension(file: File): Promise<boolean> {
    return new Promise(resolve => {
      const img = new Image(); // create image
      img.src = window.URL.createObjectURL(file);
      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        window.URL.revokeObjectURL(img.src!);
        resolve(width >= 200);
      };
    });
  }

  submitForm() {
    this.isLoading = true;
    console.log(this.obj)
    if (this.obj.id) {
      this.wxMaterialService.updateMaterial(this.obj).subscribe(res => {
        this.isLoading = false;
        if (res.success) {
          this.help.showMessage('success', res.message);
          this.help.back();
        }
      });
    } else {
      this.wxMaterialService.saveOrUpdateData(this.obj).subscribe(res => {
        this.isLoading = false;
        if (res.success) {
          this.help.showMessage('success', res.message);
          this.help.back();
        }
      });
    }
  }

  goBack() {
    history.go(-1);
  }
}
