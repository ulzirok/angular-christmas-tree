import { inject, Injectable } from '@angular/core';
import { ToysService } from './features/toys/services/toys-service';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { LocalStorage } from './core/services/local-storage';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private localStorageService = inject(LocalStorage);

  //Данные из сервиса — toysService.toys$
  private toysService = inject(ToysService);
  //Состояния фильтров — BehaviorSubject’ы: search, select, shape, color, size, checkbox
  private searchValueSubject$ = new BehaviorSubject<string>('');
  public searchValue$ = this.searchValueSubject$.asObservable();
  private selectValueSubject$ = new BehaviorSubject<string>('');
  public selectValue$ = this.selectValueSubject$.asObservable();
  private shapeValuesSubject$ = new BehaviorSubject<string[]>([]);
  public shapeValues$ = this.shapeValuesSubject$.asObservable();
  private colorValuesSubject$ = new BehaviorSubject<string[]>([]);
  public colorValues$ = this.colorValuesSubject$.asObservable();
  private sizeValuesSubject$ = new BehaviorSubject<string[]>([]);
  public sizeValues$ = this.sizeValuesSubject$.asObservable();
  private checkboxValueSubject$ = new BehaviorSubject<boolean | null>(null);
  public checkboxValue$ = this.checkboxValueSubject$.asObservable();
  private yearValuesSubject$ = new BehaviorSubject<string[]>([]);
  public yearValues$ = this.yearValuesSubject$.asObservable();

  private savedFiltersSubject$ = new BehaviorSubject<string>('');
  public savedfilters$ = this.savedFiltersSubject$.asObservable();

  constructor() {
    this.loadFromLocalStorage();
  }

  //Методы обновления состояний — filterByShape, filterByColor, filterBySize, filterByFavourite, searchToys, sortToys
  public filterByShape(shapeValues: string[]): void {
    this.shapeValuesSubject$.next(shapeValues);
    this.saveToStorage('shape', shapeValues);
  }
  public filterByColor(colorValues: string[]): void {
    this.colorValuesSubject$.next(colorValues);
    this.saveToStorage('color', colorValues);
  }
  public filterBySize(sizeValues: string[]): void {
    this.sizeValuesSubject$.next(sizeValues);
    this.saveToStorage('size', sizeValues);
  }
  public filterByFavourite(checkboxValue: boolean): void {
    this.checkboxValueSubject$.next(checkboxValue);
    this.saveToStorage('favourite', checkboxValue);
  }
  public filterByYear(yearValue: string[]): void {
    this.yearValuesSubject$.next(yearValue);
    this.saveToStorage('year', yearValue);
  }

  public sortToys(selectValue: string): void {
    this.selectValueSubject$.next(selectValue);
    this.saveToStorage('selectValue', selectValue);
  }

  public searchToys(searchValue: string): void {
    this.searchValueSubject$.next(searchValue);
    this.saveToStorage('searchValue', searchValue);
  }

  //Объединение фильтров в итоговый массив — filteredToys$ (итоговый Observable для компонентов UI) через combineLatest и map
  public filteredToys$ = combineLatest(
    this.toysService.toys$, //исходный массив с данными
    this.searchValue$, //значение Поиск
    this.selectValue$, //значение Select
    this.shapeValues$, //значения по shape в массиве
    this.colorValues$, //значения по color в массиве
    this.sizeValues$, //значения по size в массиве
    this.checkboxValue$, //значение Checkbox
    this.yearValues$, //значения по year в массиве

  ).pipe(
    map(([toys, search, selectValue, shapeValues, colorValues, sizeValues, checkboxValue, yearValues]) => {
      let finalFilteredToys = [...toys];

      //фильтры, сорты, поиск
      if (shapeValues.length > 0) {
        finalFilteredToys = finalFilteredToys.filter(toy => shapeValues.includes(toy.shape));
      }
      if (colorValues.length > 0) {
        finalFilteredToys = finalFilteredToys.filter(toy => colorValues.includes(toy.color));
      }
      if (sizeValues.length > 0) {
        finalFilteredToys = finalFilteredToys.filter(toy => sizeValues.includes(toy.size));
      }
      if (checkboxValue) {
        finalFilteredToys = finalFilteredToys.filter(toy => toy.favorite);
      }
      if (yearValues.length > 0) {
        finalFilteredToys = finalFilteredToys.filter(toy => yearValues.includes(toy.year));
      }

      if (selectValue) {
        switch (selectValue) {
          case 'name-asc':
            finalFilteredToys = [...finalFilteredToys].sort((a, b) => a.name.localeCompare(b.name));
            break;
          case 'name-all':
            finalFilteredToys;
            break;

          case 'name-desc':
            finalFilteredToys = [...finalFilteredToys].sort((a, b) => b.name.localeCompare(a.name));
            break;

          case 'count-asc':
            finalFilteredToys = [...finalFilteredToys].sort((a, b) => Number(a.count) - Number(b.count));
            break;

          case 'count-desc':
            finalFilteredToys = [...finalFilteredToys].sort((a, b) => Number(b.count) - Number(a.count));
            break;

          default:
            finalFilteredToys;
            break;
        }
      }

      if (search) {
        finalFilteredToys = finalFilteredToys.filter(toy => toy.name.toLowerCase().includes(search.toLowerCase()));
      }

      //иначе просто возвращаем итоговый массив
      return finalFilteredToys;
    })
  );

  loadFromLocalStorage() {
    this.getFromStorageAndUpdateSubject(this.shapeValuesSubject$, 'shape');
    this.getFromStorageAndUpdateSubject(this.colorValuesSubject$, 'color');
    this.getFromStorageAndUpdateSubject(this.sizeValuesSubject$, 'size');
    this.getFromStorageAndUpdateSubject(this.checkboxValueSubject$, 'favourite');
    this.getFromStorageAndUpdateSubject(this.yearValuesSubject$, 'year');
    this.getFromStorageAndUpdateSubject(this.selectValueSubject$, 'selectValue');
    this.getFromStorageAndUpdateSubject(this.searchValueSubject$, 'searchValue');
  }

  saveToStorage(key: string, value: any) {
    this.localStorageService.saveToLocalStorage(key, JSON.stringify(value));
  }

  getFromStorageAndUpdateSubject(subject: BehaviorSubject<any>, key: string) {
    const savedValue = this.localStorageService.getFromLocalStorage(key);
    if (Array.isArray(savedValue)) {
      subject.next(savedValue);
    }
  }

  resetFilters() {
    this.shapeValuesSubject$.next([]);
    this.colorValuesSubject$.next([]);
    this.sizeValuesSubject$.next([]);
    this.checkboxValueSubject$.next(null);
    this.yearValuesSubject$.next([]);
    this.selectValueSubject$.next('');
    this.searchValueSubject$.next('');

    localStorage.removeItem('shape');
    localStorage.removeItem('color');
    localStorage.removeItem('size');
    localStorage.removeItem('year');
    localStorage.removeItem('favourite');
    localStorage.removeItem('selectValue');
    localStorage.removeItem('searchValue');
  }

}
