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
  
  private originalToys: IToy[] = []
  private toySubject$ = new BehaviorSubject<IToy[]>([]);
  public toys$: Observable<IToy[]> = this.toySubject$.asObservable();

  getToys(): void {
    this.http.get<IToy[]>(this.url).subscribe(toys => {
    this.originalToys = toys
    this.toySubject$.next(toys);
    });
  }
  
  searchToys(term: string): void {
    if (term) {
      const filteredToys = this.originalToys.filter(toy => toy.name.toLowerCase().includes(term.toLowerCase()));
      this.toySubject$.next(filteredToys)
    }
    else {
      return this.toySubject$.next(this.originalToys)
    }
  }
  
  sortToys(value: string) {
    
    
  }

}
