import {Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { RoleService} from '../role.service';
import {Help} from '../../../../../utils/Help';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import { Role} from '../role';
import {of} from 'rxjs';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.scss']
})
export class RoleEditComponent implements OnInit {


  validateForm: FormGroup;
  isLoading = false;
  obj: Role = new Role();

  constructor(
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private route: ActivatedRoute,
    private help: Help) {
  }

  ngOnInit() {
    this.route.queryParamMap.pipe(
      switchMap((params: ParamMap) => {
        if (params.get('id')) {
          return this.roleService.getById(params.get('id'));
        } else {
          return of(new Role());
        }
      })
    ).subscribe(d => {
      if (d.success) {
        this.obj = d.data;
      } else {
        this.obj = new Role();
      }
    });

    this.validateForm = this.formBuilder.group({

      id: [null, null],

      organizationId: [null, null],

      code: [null, [Validators.required]],

      name: [null, [Validators.required]],

      dataAuthFlag: [null, null],

      remark: [null, null],

      status: [null, [Validators.required]],

      created: [null, null],

    });
  }

  submitForm() {
    this.isLoading = true;
    this.roleService.saveOrUpdateData(this.obj).subscribe(res => {
      this.isLoading = false;
      if (res.success) {
        this.help.showMessage('success', res.message);
        this.help.back();
      }
    });
  }

}
