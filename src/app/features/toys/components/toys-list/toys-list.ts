import { Component } from '@angular/core';
import { ToyCard } from '../toy-card/toy-card';

@Component({
  selector: 'app-toys-list',
  imports: [ToyCard],
  templateUrl: './toys-list.html',
  styleUrl: './toys-list.scss',
})
export class ToysList {}
