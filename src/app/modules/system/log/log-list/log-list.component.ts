import {Component} from '@angular/core';
import {LogService} from '../log.service';
import {Log} from '../Log';
import {Help} from '../../../../../utils/Help';
import {BaseListComponent} from "../../../../components/base-list/base-list.component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.scss'],
})
export class LogListComponent  extends BaseListComponent<Log> {

  constructor(private logService: LogService,  help: Help,  route: ActivatedRoute, router: Router) {
    super(logService, help, route, router);
  }

}
