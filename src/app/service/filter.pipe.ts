import { Pipe, PipeTransform } from '@angular/core';
import {Student} from '../model/student';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: Student[], searchText: string): any[] {
    if(!items) return [];
    if(searchText == "") return items;
    searchText = searchText.toLowerCase();
    return items.filter( it => {
      return (it.name.toLowerCase().includes(searchText)
        || it.surname.toLowerCase().includes(searchText)
        || it.indexNr.toString().includes(searchText));
    });
  }
}
