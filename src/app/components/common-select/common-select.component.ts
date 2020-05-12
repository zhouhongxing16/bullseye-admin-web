import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {noop} from 'rxjs';
import {Help} from '../../../utils/Help';

@Component({
  selector: 'app-common-select',
  templateUrl: './common-select.component.html',
  styles: [
  ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CommonSelectComponent),
    multi: true
  }]
})
export class CommonSelectComponent implements OnInit , ControlValueAccessor {

  @Input()
  url: string;

  @Input()
  params: any = {};

  public innerValue: string;

  dataList: any = [];

  // 定义ControlValueAccessor提供的事件回调
  private onTouched: () => void = noop;
  private onChange: (_: any) => void = noop;

  constructor(public help: Help) {
  }

  writeValue(obj: any): void {
    if (obj !== this.value) {
      this.value = obj;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.params = eval(this.params);
    this.getDataListByParams();
  }

  getDataListByParams() {
    this.help.post(this.url, this.params).subscribe(data => {
      this.dataList = data.list;
    }, err => {
      this.help.showMessage('error', `请求出现错误: ${JSON.stringify(err)}`);
    });
  }

  // 获取值的访问
  get value(): string {
    return this.innerValue;
  }

  // 设置值，同时触发change回调
  set value(v: string) {
    console.log(v);
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChange(v);
    }
  }

}
