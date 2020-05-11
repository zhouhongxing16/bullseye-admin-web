import {Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {DictionaryDataService} from '../dictionary-data.service';
import {Help} from '../../../../../utils/Help';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {DictionaryData} from '../DictionaryData';
import {BehaviorSubject, of} from 'rxjs';
import {DictionaryType} from '../../dictionary-type/DictionaryType';
import {Staff} from '../../staff/staff';
import {DictionaryTypeService} from '../../dictionary-type/dictionary-type.service';

@Component({
  selector: 'app-dictionary-data-edit',
  templateUrl: './dictionary-data-edit.component.html',
  styleUrls: ['./dictionary-data-edit.component.scss']
})
export class DictionaryDataEditComponent implements OnInit {


  pageParams: any;
  typeParams: any = {};
  validateForm: FormGroup;
  isLoading = false;
  obj: DictionaryData = new DictionaryData();

  typeList: DictionaryType[];

  constructor(
    private formBuilder: FormBuilder,
    private dictionaryDataService: DictionaryDataService,
    private dictionaryTypeService: DictionaryTypeService,
    private route: ActivatedRoute,
    public help: Help) {
  }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.pageParams = params;
    });
    this.route.queryParamMap.pipe(
      switchMap((params: ParamMap) => {
        if (params.get('id')) {
          return this.dictionaryDataService.getById(params.get('id'));
        } else {
          return of(new DictionaryData());
        }
      })
    ).subscribe(d => {
      if (d.success) {
        this.obj = d.data;
      } else {
        this.obj = new DictionaryData();
      }
    });

    this.validateForm = this.formBuilder.group({
      id: [null, null],

      typeId: [null, [Validators.required]],

      code: [null, [Validators.required]],

      name: [null, [Validators.required]],

      remark: [null, null],

      status: [null, [Validators.required]],

      created: [null, null],

      userId: [null, null],


    });
    this.getTypeListByParams();
  }

  getTypeListByParams(reset: boolean = false) {

    this.help.isLoading = true;
    this.dictionaryTypeService.getListByParams(this.typeParams).subscribe(data => {
      this.help.isLoading = false;
      this.typeList = data.list;
    }, err => {
      this.help.isLoading = false;
      this.help.showMessage('error', `请求出现错误: ${JSON.stringify(err)}`);
    });
  }

  submitForm() {
    this.isLoading = true;
    this.dictionaryDataService.saveOrUpdateData(this.obj).subscribe(res => {
      this.isLoading = false;
      if (res.success) {
        this.help.showMessage('success', res.message);
        this.help.goToPage('/dictionarydata/list', this.pageParams);
      }
    });
  }

}
