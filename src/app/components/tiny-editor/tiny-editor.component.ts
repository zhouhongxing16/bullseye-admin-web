import {Component, forwardRef, OnInit} from '@angular/core';
import tinymce from 'tinymce';
import {Help} from '../../../utils/Help';
import {environment} from '../../../environments/environment';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {noop} from 'rxjs';

@Component({
  selector: 'app-tiny-editor',
  templateUrl: './tiny-editor.component.html',
  styles: [],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TinyEditorComponent),
    multi: true
  }]
})
export class TinyEditorComponent implements OnInit, ControlValueAccessor {

  public editorContent: string;

  editorConfig: any = {};

  // 定义ControlValueAccessor提供的事件回调
  private onTouched: () => void = noop;
  private onChange: (_: any) => void = noop;

  constructor(public help: Help) {
    const editor = tinymce.get('editorID');

    // 编辑器配置
    this.editorConfig = {
      base_url: '/tinymce',
      height: 1000,
      plugins: `print preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount imagetools textpattern help emoticons autosave bdmap indent2em autoresize lineheight`,
      toolbar: `code undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent |
                     styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat |
                     table image media charmap emoticons hr pagebreak insertdatetime print preview | fullscreen | bdmap indent2em lineheight`,

      menubar: false,
      language: 'zh_CN',
      language_url: '/tinymce/lang/zh_CN.js',
      automatic_uploads: true,
      images_upload_url: environment.SERVER_URL + '/bizfile/uploadSingleFile',
      paste_data_images: true,
      branding: false,
      images_upload_handler(blobInfo, successFun, failFun) {
        // 转化为易于理解的file对象
        const formData = new FormData();
        formData.append('file', blobInfo.blob());
        help.post(environment.SERVER_URL + '/bizfile/uploadSingleFile', formData).subscribe((res) => {
          console.log(res);
          if (res.success) {
            successFun(environment.SERVER_URL + res.data.fullFilePath);
          } else {
            failFun(res.data);
          }
          // http://tinymce.ax-z.cn/general/upload-images.php
        });
      }
    };
  }

  ngOnInit(): void {

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

  /*ngOnDestroy() {
    tinymce.remove(this.editor);        // 组件移除时销毁编辑器
  }*/

  // 获取值的访问
  get value(): string {
    return this.editorContent;
  }

  // 设置值，同时触发change回调
  set value(v: string) {
    console.log(v);
    if (v !== this.editorContent) {
      this.editorContent = v;
      this.onChange(v);
    }
  }
}
