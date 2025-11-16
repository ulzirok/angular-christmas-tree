import { Component, inject, OnInit } from '@angular/core';
import { Search } from '../search/search';
import { ButtonVolume } from '../../../../shared/components/button-volume/button-volume';
import { ButtonSnow } from '../../../../shared/components/button-snow/button-snow';
import { ButtonReset } from '../../../../shared/components/button-reset/button-reset';
import { FormsModule } from '@angular/forms';
import { ToysService } from '../../services/toys-service';
import { StateService } from '../../../../state-service';
import { map, Observable } from 'rxjs';
import { AsyncPipe, NgIf, NgClass } from '@angular/common';
import { IShape } from '../../models/shape-model';
import { IColor } from '../../models/color-model';
import { ISize } from '../../models/size-model';

@Component({
  selector: 'app-toys-settings',
  imports: [Search, ButtonVolume, ButtonSnow, ButtonReset, FormsModule, AsyncPipe],
  templateUrl: './toys-settings.html',
  styleUrl: './toys-settings.scss',
})
export class ToysSettings implements OnInit {
  shapes$!: Observable<IShape[]>
  colors$!: Observable<IColor[]>
  sizes$!: Observable<ISize[]>
  selectedShapes: string[] = []
  selectedColors: string[] = []
  selectedSizes: string[] = []
  
  private toyService = inject(ToysService)
  private stateService = inject(StateService)
  
  private getUniqueFieldWithImages(fieldName: 'shape' | 'color' | 'size', extension: 'png' | 'svg' = 'png') {
    return this.toyService.toys$.pipe(
      map((toys) => {
        const array = toys.map(value => value[fieldName]); //массив
        const arrayUnique = [...new Set(array)]; //убираем дубликаты в массиве
        return arrayUnique.map(value => ({ name: value, imageUrl: `assets/images/${value}.${extension}` })); //из массива создаем объект
      })
    );
  }
  
  getSelectedShapes(valueShape: string): void {
    if (!valueShape) return
    if (this.selectedShapes.includes(valueShape)) {
      this.selectedShapes = this.selectedShapes.filter(el => el !== valueShape); //удаляем форму если уже есть такая форма
    }
    else {
      this.selectedShapes.push(valueShape); //добавляем если нет
    }
    this.shapeValueChange(this.selectedShapes)
  }
  getSelectedColors(valueColor: string): void {
    if (!valueColor) return
    if (this.selectedColors.includes(valueColor)) {
      this.selectedColors = this.selectedColors.filter(el => el !== valueColor); //удаляем форму если уже есть такая форма
    }
    else {
      this.selectedColors.push(valueColor); //добавляем если нет
    }
    this.colorValueChange(this.selectedColors)
  }
  getSelectedSizes(valueSize: string): void {
    if (!valueSize) return
    if (this.selectedSizes.includes(valueSize)) {
      this.selectedSizes = this.selectedSizes.filter(el => el !== valueSize); //удаляем форму если уже есть такая форма
    }
    else {
      this.selectedSizes.push(valueSize); //добавляем если нет
    }
    this.sizeValueChange(this.selectedSizes)
  }
  
  shapeValueChange(valueShapes: string[]): void {
    this.stateService.filterByShape(valueShapes)
  }
  colorValueChange(valueColor: string[]): void {
    this.stateService.filterByColor(valueColor)
  }
  sizeValueChange(valueSize: string[]): void {
    this.stateService.filterBySize(valueSize)
  }
  
  checkboxValueChange(event: Event): void {
    const valueCheckbox = (event.target as HTMLInputElement).checked
    this.stateService.filterByFavourite(valueCheckbox)
  }
  
  selectValueChange(event: Event): void { //сортировка
    const valueSelect = (event.target as HTMLSelectElement).value
    this.stateService.sortToys(valueSelect)
  }
  
  onInputValueChanged(inputValue: string): void { //поиск
    this.stateService.searchToys(inputValue);
  }
  
  ngOnInit(): void {
    this.shapes$ = this.getUniqueFieldWithImages('shape', 'svg')
    this.colors$ = this.getUniqueFieldWithImages('color', 'png')
    this.sizes$ = this.getUniqueFieldWithImages('size')
  }
}
