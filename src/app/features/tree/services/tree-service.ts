import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITree } from '../models/tree';
import { IBg } from '../models/bg';
import { IGarland } from '../models/garkand';

@Injectable({
  providedIn: 'root',
})
export class TreeService {
  private treesSubject$ = new BehaviorSubject<ITree[]>([])
  public trees$ = this.treesSubject$.asObservable()
  private bgsSubject$ = new BehaviorSubject<IBg[]>([])
  public bgs$ = this.bgsSubject$.asObservable()
  private garlandsSubject$ = new BehaviorSubject<IGarland[]>([])
  public garlands$ = this.garlandsSubject$.asObservable()
  
  private currentTreeSubject$ = new BehaviorSubject<string>('')
  public currentTree$ = this.currentTreeSubject$.asObservable()
  private currentBackgroundSubject$ = new BehaviorSubject<string>('')
  public currentBackground$ = this.currentBackgroundSubject$.asObservable()
  private isGarlandOnSubject$ = new BehaviorSubject<boolean | null>(null)
  public isGarlandOn$ = this.isGarlandOnSubject$.asObservable()
  private garlandColorSubject$ = new BehaviorSubject<string>('')
  public garlandColor$ = this.garlandColorSubject$.asObservable()
  private isSnowOnSubject$ = new BehaviorSubject<boolean | null>(null)
  public isSnowOn$ = this.isSnowOnSubject$.asObservable()
  private isAudioOnSubject$ = new BehaviorSubject<boolean | null>(null)
  public isAudioOn$ = this.isAudioOnSubject$.asObservable()
  
  private http = inject(HttpClient)
  private urlTrees: string = 'assets/data/trees.json'
  private urlBgs: string = 'assets/data/bgs.json'
  private urlGarlands: string = 'assets/data/garlands.json'
  
  getTrees(): void {
    this.http.get<ITree[]>(this.urlTrees).subscribe((trees) => {
      this.treesSubject$.next(trees)
      
      if (!this.currentTreeSubject$.getValue()) {
        this.currentTreeSubject$.next(trees[0].image);
      }
    })
    
  }
  getBgs(): void {
    this.http.get<IBg[]>(this.urlBgs).subscribe((bgs) => {
      this.bgsSubject$.next(bgs)
      
      if (!this.currentBackgroundSubject$.getValue()) {
        this.currentBackgroundSubject$.next(bgs[0].image)
      }
    })
  }
  getGarlands(): void {
    this.http.get<IGarland[]>(this.urlGarlands).subscribe((garlands) => {
      this.garlandsSubject$.next(garlands)
      
      if (!this.garlandColorSubject$.getValue()) {
        this.garlandColorSubject$.next(garlands[0].color)
      }
    })
  }
  
  chooseTree(valueTree: string) {
    this.currentTreeSubject$.next(valueTree)
  }
  chooseBg(valueBg: string) {
    this.currentBackgroundSubject$.next(valueBg)
  }
  onSwitcher(valueSwitcher: boolean) {
    this.isGarlandOnSubject$.next(valueSwitcher)
  }
  chooseGarland(colorValue: string) {
    this.garlandColorSubject$.next(colorValue)
  }
  
  
  
}
