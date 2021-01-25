import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateString'
})
export class TruncateStringPipe implements PipeTransform {
  transform(value: string, fromStart: number = 0, fromEnd: number = 0): string {
    const stringLength = value.length;
    if (
      fromStart >= stringLength
      || fromEnd >= stringLength
      || fromStart + fromEnd >= stringLength
      || (fromStart === 0 && fromEnd === 0)
    ) {
      return value;
    }
    return `${value.slice(0, fromStart)}...${value.slice(stringLength - fromEnd)}`;
  }
}
