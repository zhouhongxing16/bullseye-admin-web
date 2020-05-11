
import {Component} from '@angular/core';

import {Help} from '../../../../../utils/Help';
import {BaseListComponent} from '../../../../components/base-list/base-list.component';
import {ActivatedRoute, Router} from '@angular/router';
import { DictionaryData} from '../DictionaryData';
import {DictionaryDataService} from '../dictionary-data.service';

@Component({
  selector: 'app-dictionary-data-list',
  templateUrl: './dictionary-data-list.component.html',
  styleUrls: ['./dictionary-data-list.component.scss'],
})
export class DictionaryDataListComponent extends BaseListComponent<DictionaryData> {
  constructor(dictionaryDataService: DictionaryDataService,  help: Help,  route: ActivatedRoute, router: Router) {
    super(dictionaryDataService, help, route, router);
  }

}
