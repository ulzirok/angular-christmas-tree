import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IBg } from '../../../features/tree/models/bg';

@Component({
  selector: 'app-tree-bg',
  imports: [],
  templateUrl: './tree-bg.html',
  styleUrl: './tree-bg.scss',
})
export class TreeBg {
  @Input() bg!: IBg;
  @Output() bgChosen = new EventEmitter();

  chooseBg(valueBg: string) {
    this.bgChosen.emit(valueBg);
  }
}
