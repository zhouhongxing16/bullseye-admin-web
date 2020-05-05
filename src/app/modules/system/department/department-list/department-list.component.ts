import { Component } from '@angular/core';
import {Help} from '../../../../../utils/Help';
import {Department} from '../department';
import {DepartmentService} from '../department.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseListComponent} from '../../../../components/base-list/base-list.component';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss']
})
export class DepartmentListComponent extends BaseListComponent<Department> {

  constructor( departmentService: DepartmentService,  help: Help,  route: ActivatedRoute, router: Router) {
    super(departmentService, help, route, router);
  }


}
