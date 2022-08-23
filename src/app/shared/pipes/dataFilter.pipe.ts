import { Pipe, PipeTransform } from '@angular/core';
import {OptionData} from '../components/inputAutocomplete/interfaces/optionData';

@Pipe({
  name: 'dataFilter'
})
export class DataFilterPipe implements PipeTransform {

  transform(items: any[], expectedText: string): OptionData[] {
    if (!items) {
      return [];
    }
    if(!expectedText) {
      return items;
    }
    expectedText = expectedText.toLocaleLowerCase();

    return items = items.filter(item => {
      return item.label.toLocaleLowerCase().includes(expectedText);
    })
  }

}
