import { Component, inject, OnInit } from '@angular/core';
import { ToyCard } from '../toy-card/toy-card';
import { Observable } from 'rxjs';
import { IToy } from '../../models/toy-model';
import { ToysService } from '../../services/toys-service';
import { AsyncPipe, NgFor } from '@angular/common';
import { StateService } from '../../../../state-service';

@Component({
  selector: 'app-toys-list',
  imports: [ToyCard, AsyncPipe, NgFor],
  templateUrl: './toys-list.html',
  styleUrl: './toys-list.scss',
})
export class ToysList implements OnInit {
  toys$!: Observable<IToy[]>;

  private toysService = inject(ToysService);
  private stateService = inject(StateService);

  ngOnInit(): void {
    this.toysService.getToys();
    this.toys$ = this.stateService.filteredToys$;
  }
}
