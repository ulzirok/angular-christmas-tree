import { inject, Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class LocalStorage {
  public saveToLocalStorage(key: string, value: string) {
    return localStorage.setItem(key, value);
  }
  public getFromLocalStorage(key: string): string | null {
    const data = localStorage.getItem(key);
    if (!data) return null;
    return JSON.parse(data);
  }
}
