import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITree } from '../../../features/tree/models/tree';

@Component({
  selector: 'app-tree-card',
  imports: [],
  templateUrl: './tree-card.html',
  styleUrl: './tree-card.scss',
})
export class TreeCard {
  @Input() tree!: ITree;
  @Output() chosenTree = new EventEmitter();

  chooseTree(valueTree?: string) {
    this.chosenTree.emit(valueTree);
  }
}
