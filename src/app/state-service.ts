import { inject, Injectable } from '@angular/core';
import { ToysService } from './features/toys/services/toys-service';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { IShape } from './features/toys/models/shape-model';
import { IColor } from './features/toys/models/color-model';
import { ISize } from './features/toys/models/size-model';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  //Данные из сервиса — toysService.toys$
  private toysService = inject(ToysService);
  //Состояния фильтров — BehaviorSubject’ы: search, select, shape, color, size, checkbox
  private searchValueSubject$ = new BehaviorSubject<string>('');
  public searchValue$ = this.searchValueSubject$.asObservable()
  private selectValueSubject$ = new BehaviorSubject<string>('')
  public selectValue$ = this.selectValueSubject$.asObservable()
  private shapeValuesSubject$ = new BehaviorSubject<string[]>([])
  public shapeValues$ = this.shapeValuesSubject$.asObservable()
  private colorValuesSubject$ = new BehaviorSubject<string[]>([])
  public colorValues$ = this.colorValuesSubject$.asObservable()
  private sizeValuesSubject$ = new BehaviorSubject<string[]>([])
  public sizeValues$ = this.sizeValuesSubject$.asObservable()
  private checkboxValueSubject$ = new BehaviorSubject<boolean | null>(null)
  public checkboxValue$ = this.checkboxValueSubject$.asObservable()
  
  //Методы обновления состояний — filterByShape, filterByColor, filterBySize, filterByFavourite, searchToys, sortToys
  public filterByShape(shapeValues: string[]): void {
    this.shapeValuesSubject$.next(shapeValues)
  }
  public filterByColor(colorValues: string[]): void {
    this.colorValuesSubject$.next(colorValues)
  }
  public filterBySize(sizeValues: string[]): void {
    this.sizeValuesSubject$.next(sizeValues)
  }
  public filterByFavourite(checkboxValue: boolean): void {
    console.log(checkboxValue);
    
    this.checkboxValueSubject$.next(checkboxValue)
  }
  
  public sortToys(selectValue: string): void {
    this.selectValueSubject$.next(selectValue)
  }
  
  public searchToys(searchValue: string): void {
    this.searchValueSubject$.next(searchValue);
  }
  
  //Объединение фильтров в итоговый массив — filteredToys$ (итоговый Observable для компонентов UI) через combineLatest и map
  public filteredToys$ = combineLatest(
    this.toysService.toys$, //исходный массив с данными
    this.searchValue$, //значение Поиск
    this.selectValue$, //значение Select
    this.shapeValues$, //значения по shape в массиве
    this.colorValues$, //значения по color в массиве
    this.sizeValues$, //значения по size в массиве
    this.checkboxValue$ //значение Checkbox
  ).pipe(
    map(([toys, search, selectValue, shapeValues, colorValues, sizeValues, checkboxValue]) => {
      let finalFilteredToys = [...toys];
      
      //фильтры, сорты, поиск
      if (shapeValues.length > 0) {
        finalFilteredToys = finalFilteredToys.filter(toy => shapeValues.includes(toy.shape))
      }
      if (colorValues.length > 0) {
        finalFilteredToys = finalFilteredToys.filter(toy => colorValues.includes(toy.color))
      }
      if (sizeValues.length > 0) {
        finalFilteredToys = finalFilteredToys.filter(toy => sizeValues.includes(toy.size))
      }
      if (checkboxValue) {
        finalFilteredToys = finalFilteredToys.filter(toy => toy.favorite)
      }
      
      if (selectValue) {
        switch (selectValue) {
          case 'name-asc':
            finalFilteredToys = [...finalFilteredToys].sort((a, b) => a.name.localeCompare(b.name)) 
            break;
        
          case 'name-desc':
            finalFilteredToys = [...finalFilteredToys].sort((a, b) => b.name.localeCompare(a.name)) 
            break;
          
          case 'count-asc':
            finalFilteredToys = [...finalFilteredToys].sort((a, b) => Number(a.count) - Number(b.count));
            break;
          
          case 'count-desc':
            finalFilteredToys = [...finalFilteredToys].sort((a, b) => Number(b.count) - Number(a.count));
            break;
        
          default:
            finalFilteredToys
            break;
        }
      }
      
      if (search) {
        finalFilteredToys = finalFilteredToys.filter(toy => toy.name.toLowerCase().includes(search.toLowerCase()));
      }
      
      //иначе просто возвращаем итоговый массив
      return finalFilteredToys 
    })
  )
}
