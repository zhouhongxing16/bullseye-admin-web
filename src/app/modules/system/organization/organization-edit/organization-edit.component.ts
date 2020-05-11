import {Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { OrganizationService} from '../organization.service';
import {Help} from '../../../../../utils/Help';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Organization} from '../organization';

@Component({
  selector: 'app-organization-edit',
  templateUrl: './organization-edit.component.html',
  styleUrls: ['./organization-edit.component.scss']
})
export class OrganizationEditComponent implements OnInit {

  pageParams: any;
  validateForm: FormGroup;
  obj: Organization = new Organization();

  constructor(
    private formBuilder: FormBuilder,
    private organizationService: OrganizationService,
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
          return this.organizationService.getById(params.get('id'));
        } else {
          return of(new Organization());
        }
      })
    ).subscribe(d => {
      if (d.success) {
        this.obj = d.data;
      } else {
        this.obj = new Organization();
      }
    });

    this.validateForm = this.formBuilder.group({

      pid: [null, [Validators.required]],

      code: [null, [Validators.required]],

      name: [null, [Validators.required]],

      areaId: [null, [Validators.required]],

      brief: [null, [Validators.required]],

      contactName: [null, [Validators.required]],

      contactPhone: [null, [Validators.required]],

      status: [null, [Validators.required]],

      endDate: [null, [Validators.required]],

      domain: [null, [Validators.required]],

      created: [null, [Validators.required]],

    });
  }

  submitForm() {
    this.help.isLoading = true;
    this.organizationService.saveOrUpdateData(this.obj).subscribe(res => {
      this.help.isLoading = false;
      if (res.success) {
        this.help.showMessage('success', res.message);
        this.help.back();
      }
    });
  }

}
