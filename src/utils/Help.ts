import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Observer} from 'rxjs';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {formatDate, Location} from '@angular/common';
import {Router} from '@angular/router';
import {environment} from '../environments/environment';

@Injectable()
export class Help {
  private loadId: any;
  public isCollapsed = false;
  public environment = environment;
  constructor(
    private http: HttpClient,
    private message: NzMessageService,
    private location: Location,
    public modalService: NzModalService,
    private router: Router
  ) {
  }

  back() {
    this.location.back();
  }

  go(url: string) {
    this.location.go(url);
  }

  showMessage(type: string, msg: string) {
    this.message.create(type, msg);
  }

  loading(msg: string = '加载中...') {
    this.loadId = this.message.loading(msg, {nzDuration: 0}).messageId;
  }

  stopLoad() {
    this.message.remove(this.loadId);
  }

  get(url: string): Observable<any> {
    return this.http.get(url);
  }


  post(url: string, params: any): Observable<any> {
    return this.http.post(url, params);
  }


  isEmpty(val): boolean {
    if (val !== undefined && val != null && (val + '').trim() !== '') {
      return false;
    } else {
      return true;
    }
  }

  goToPage(path: string, params: any) {
    this.router.navigate([path], {
      queryParams: params
    });
  }

  showSuccessModal(title: string, content: string) {
    if (this.isEmpty(title)) {
      title = '提示';
    }
    if (this.isEmpty(content)) {
      content = '内容';
    }
    const modal = this.modalService.success({
      nzTitle: title,
      nzContent: content
    });
    setTimeout(() => modal.destroy(), 2000);
  }


  convertTime(timestamp: any) {
    const time: any = new Date(timestamp);
    const year = time.getFullYear();
    const month = time.getMonth() + 1;
    const date = time.getDate();
    const hour = time.getHours();
    const minute = time.getMinutes();
    const second = time.getSeconds();
    return year + '-' + month + '-' + date + '   ' + hour + ':' + minute + ':' + second;
  }

  fmtDate(date, format) {
    const  time = formatDate(new Date(), format, 'zh-Hans');
    return time;
  }

  emptyObject(parsent) {
    // tslint:disable-next-line:forin
    for (const key in parsent) {
      delete parsent[key];
    }
  }

  clearObject(data) {
    // tslint:disable-next-line:forin
    for (const key in data) {
      data[key] = null;
    }
  }
  copyObject(fromObj, toObj) {
    // tslint:disable-next-line:forin
    for (const key in fromObj) {
      toObj[key] = fromObj[key];
    }
    return toObj;
  }



  beforeUpload = (file: File) => {
    return new Observable((observer: Observer<boolean>) => {
      const isJPG = file.type === 'image/jpeg';
      if (!isJPG) {
        this.showMessage('error', '只能上传 JPG 文件');
        observer.complete();
        return;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.showMessage('error', '文件大小不能超过2MB!');
        observer.complete();
        return;
      }
      // check height
      this.checkImageDimension(file).then(dimensionRes => {
        if (!dimensionRes) {
          this.showMessage('error', '分辨率300x300以上');
          observer.complete();
          return;
        }

        observer.next(isJPG && isLt2M && dimensionRes);
        observer.complete();
      });
    });
  }

  checkImageDimension(file: File): Promise<boolean> {
    return new Promise(resolve => {
      const img = new Image(); // create image
      img.src = window.URL.createObjectURL(file);
      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        window.URL.revokeObjectURL(img.src!);
        resolve(width === height && width >= 300);
      };
    });
  }

  getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }
}
