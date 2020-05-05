import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'flag'})
export class FlagPipe implements PipeTransform {
  transform(value: number): string {
    return value ? '是' : '否';
  }
}
