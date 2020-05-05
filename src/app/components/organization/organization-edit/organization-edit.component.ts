import {Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { OrganizationService} from '../organization.service';
import {Help} from '../../../../utils/Help';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import { Organization} from '../Organization';
import {of} from 'rxjs';

@Component({
  selector: 'app-organization-edit',
  templateUrl: './organization-edit.component.html',
  styleUrls: ['./organization-edit.component.scss']
})
export class OrganizationEditComponent implements OnInit {


  validateForm: FormGroup;
  isLoading = false;
  obj: Organization = new Organization();

  constructor(
    private formBuilder: FormBuilder,
    private organizationService: OrganizationService,
    private route: ActivatedRoute,
    private help: Help) {
  }

  ngOnInit() {
    this.route.paramMap.pipe(
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
    this.isLoading = true;
    this.organizationService.saveOrUpdateData(this.obj).subscribe(res => {
      this.isLoading = false;
      if (res.success) {
        this.help.showMessage('success', res.message);
        this.help.back();
      }
    });
  }

}
