import { Pipe, PipeTransform } from '@angular/core';
import { IToy } from '../../features/toys/models/toy-model';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipePipe implements PipeTransform {

  transform(toys: IToy[], search: string): IToy[] {
    if (!toys || !search) {
      return toys;
    }
    
    return toys.filter(toy => {
      toy.name.toLowerCase().includes(search.toLowerCase())
    })
  }

}
