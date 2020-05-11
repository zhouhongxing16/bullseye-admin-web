import {Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {DictionaryTypeService} from '../dictionary-type.service';
import {Help} from '../../../../../utils/Help';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {DictionaryType} from '../DictionaryType';
import {of} from 'rxjs';

@Component({
  selector: 'app-dictionary-type-edit',
  templateUrl: './dictionary-type-edit.component.html',
  styleUrls: ['./dictionary-type-edit.component.scss']
})
export class DictionaryTypeEditComponent implements OnInit {

  pageParams: any;
  validateForm: FormGroup;
  isLoading = false;
  obj: DictionaryType = new DictionaryType();

  constructor(
    private formBuilder: FormBuilder,
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
          return this.dictionaryTypeService.getById(params.get('id'));
        } else {
          return of(new DictionaryType());
        }
      })
    ).subscribe(d => {
      if (d.success) {
        this.obj = d.data;
      } else {
        this.obj = new DictionaryType();
      }
    });

    this.validateForm = this.formBuilder.group({
      id: [null, null],


      code: [null, [Validators.required]],


      name: [null, [Validators.required]],

      remark: [null, null],


      status: [null, [Validators.required]],

      created: [null, null],


      userId: [null, null],


    });
  }

  submitForm() {
    this.isLoading = true;
    this.dictionaryTypeService.saveOrUpdateData(this.obj).subscribe(res => {
      this.isLoading = false;
      if (res.success) {
        this.help.showMessage('success', res.message);
        this.help.goToPage('/dictionarytype/list', this.pageParams);
      }
    });
  }

}
