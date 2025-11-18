import { Component, inject, OnInit } from '@angular/core';
import { StateService } from '../../../../state-service';
import { ToysService } from '../../../toys/services/toys-service';
import { Observable } from 'rxjs';
import { IToy } from '../../../toys/models/toy-model';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-favourites',
  imports: [AsyncPipe],
  templateUrl: './favourites.html',
  styleUrl: './favourites.scss',
})
export class Favourites implements OnInit {
  private stateService = inject(StateService)
  private toysService = inject(ToysService)
  toys$!: Observable<IToy[]>
  
  getImagePath(toy: IToy) {
    return `assets/images/toys/${toy.num}.png`
  }
  
  ngOnInit(): void {
    this.toysService.getToys()
    this.toys$ = this.stateService.filteredToys$
  }
}
