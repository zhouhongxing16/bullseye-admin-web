import {NgModule} from '@angular/core';
import {StatusPipe} from '../../../utils/StatusPipe';
import {FlagPipe} from '../../../utils/FlagPipe';

@NgModule({
  declarations: [StatusPipe, FlagPipe],
  imports: [],
  exports: [
    StatusPipe,
    FlagPipe
  ]

})
export class CommonPipeModule {
}
