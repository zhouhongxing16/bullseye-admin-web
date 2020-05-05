import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

@Injectable()
export class Help {
  private loadId: any;
  public isCollapsed = false;

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
}
