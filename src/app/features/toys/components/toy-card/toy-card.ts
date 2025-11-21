import { Component, Input } from '@angular/core';
import { IToy } from '../../models/toy-model';

@Component({
  selector: 'app-toy-card',
  imports: [],
  templateUrl: './toy-card.html',
  styleUrl: './toy-card.scss',
})
export class ToyCard {
  @Input() toy?: IToy;

  getImagePath(toy?: IToy) {
    return `assets/images/toys/${toy?.num}.png`;
  }
}
