import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IToy } from '../models/toy-model';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToysService {
  private http = inject(HttpClient);
  private url: string = 'assets/data/toys.json';
  
  private toysSubject$ = new BehaviorSubject<IToy[]>([]); //приватный исходный массив
  public toys$: Observable<IToy[]> = this.toysSubject$.asObservable(); //публичный исходный массив для компонентов

  getToys(): void {
    this.http.get<IToy[]>(this.url).subscribe(toys => {
      this.toysSubject$.next(toys);
    });
  }
}
