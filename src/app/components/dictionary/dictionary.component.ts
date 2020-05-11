import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DictionaryData} from '../../modules/system/dictionary-data/DictionaryData';
import {DictionaryDataService} from '../../modules/system/dictionary-data/dictionary-data.service';
import {Help} from '../../../utils/Help';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styles: []
})
export class DictionaryComponent implements OnInit {
  @Input()
  formControlName: string;

  @Input()
  typeCode: string;

  @Output()
  public contentChange = new EventEmitter();

  value: string;

  dataList: DictionaryData[];

  constructor(public dictionaryDataService: DictionaryDataService, public help: Help) {
  }

  ngOnInit(): void {
    this.getDataListByParams();
  }

  getDataListByParams() {
    this.help.isLoading = true;
    this.dictionaryDataService.getListByParams({typeCode: this.typeCode}).subscribe(data => {
      this.help.isLoading = false;
      this.dataList = data.list;
    }, err => {
      this.help.isLoading = false;
      this.help.showMessage('error', `请求出现错误: ${JSON.stringify(err)}`);
    });
  }

  /**
   * change
   */
  public change() {
    this.contentChange.emit(this.value);
  }
}
