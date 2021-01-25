import { Component, Input } from '@angular/core';
import { typeChipMap } from './chip-map';

@Component({
  selector: 'tez-type-chip',
  templateUrl: './type-chip.component.html',
  styleUrls: ['./type-chip.component.scss']
})
export class TypeChipComponent  {
  typeChipMap = (typeChipMap as any);

  @Input() type: any;
}
