import {Component} from '@angular/core';
import {DictionaryTypeService} from '../dictionary-type.service';
import {Help} from '../../../../../utils/Help';
import {DictionaryType} from '../DictionaryType';
import {BaseListComponent} from '../../../../components/base-list/base-list.component';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-dictionary-type-list',
  templateUrl: './dictionary-type-list.component.html',
  styleUrls: ['./dictionary-type-list.component.scss'],
})
export class DictionaryTypeListComponent extends BaseListComponent<DictionaryType> {
  constructor(dictionaryTypeService: DictionaryTypeService, help: Help, route: ActivatedRoute, router: Router) {
    super(dictionaryTypeService, help, route, router);
  }

}
