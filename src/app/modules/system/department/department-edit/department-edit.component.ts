import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DepartmentService} from '../department.service';
import {Help} from '../../../../../utils/Help';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Department} from "../department";

@Component({
  selector: 'app-department-edit',
  templateUrl: './department-edit.component.html',
  styleUrls: ['./department-edit.component.scss']
})
export class DepartmentEditComponent implements OnInit {

  pageParams: any;
  validateForm: FormGroup;
  obj: Department = new Department();

  constructor(
    private formBuilder: FormBuilder,
    private departmentService: DepartmentService,
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
          return this.departmentService.getById(params.get('id'));
        } else {
          return of(new Department());
        }
      })
    ).subscribe(d => {
      if (d.success) {
        this.obj = d.data;
      } else {
        this.obj = new Department();
      }
    });

    this.validateForm = this.formBuilder.group({

      id: [null, null],

      organizationId: [null, [Validators.required]],

      code: [null, [Validators.required]],

      name: [null, [Validators.required]],

      typeId: [null, [Validators.required]],

      remark: [null, null],

      status: [null, [Validators.required]],

      brief: [null, null],

      created: [null, null],

    });
  }

  submitForm() {
    this.help.isLoading = true;
    this.departmentService.saveOrUpdateData(this.obj).subscribe(res => {
      this.help.isLoading = false;
      if (res.success) {
        this.help.showMessage('success', res.message);
        this.help.goToPage('/department/list', this.pageParams);
      }
    });
  }

}
