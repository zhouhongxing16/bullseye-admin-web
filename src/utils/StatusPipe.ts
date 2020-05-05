import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'status'})
export class StatusPipe implements PipeTransform {
  transform(value: number): string {
    let result = '';
    switch (value) {
      case 0:
        result = `禁用`;
        break;
      case 1:
        result = `启用`;
        break;
      case 2:
        result = ``;
        break;
      default:
        result = ``;
        break;
    }
    console.log(result);
    return  result;
  }
}
