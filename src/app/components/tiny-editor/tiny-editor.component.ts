import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import tinymce from 'tinymce';
import {Help} from '../../../utils/Help';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-tiny-editor',
  templateUrl: './tiny-editor.component.html',
  styles: []
})
export class TinyEditorComponent implements OnInit {
  @Input()
  elementId: string;

  @Output()
  public contentChange = new EventEmitter();

  @Input()
  content;

  editor;
  // 编辑器配置
  editorConfig = {
    base_url: '/tinymce',
    height: 500,
    menubar: false,
    plugins: ['image paste media'],
    toolbar: 'image paste media',
    language: 'zh_CN',
    language_url: '/tinymce/lang/zh_CN.js',
    automatic_uploads: false,
    images_upload_url: environment.SERVER_URL + '/bizfile/uploadSingleFile',
    paste_data_images: true,
    branding: false
  };

  constructor(private help: Help) {

  }

  ngOnInit(): void {
  }

  postContent(): void {
    const editor = tinymce.get('editorID');
    console.log(editor);
    editor.uploadImages(success => {
      const url = environment.SERVER_URL + '/bizfile/uploadSingleFile';
      console.log('调用了此回调函数');
      this.help.post(url, this.content).subscribe(res => console.log(res));
    });
  }

  contentInfo(): void {
    console.log('编辑器的内容：', this.content);
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);        // 组件移除时销毁编辑器
  }

  /**
   * change
   */
  public change() {
    this.contentChange.emit(this.content);
  }

}
