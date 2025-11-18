import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBg } from '../../models/bg';
import { ITree } from '../../models/tree';
import { TreeService } from '../../services/tree-service';
import { AsyncPipe, NgStyle, NgClass } from '@angular/common';

@Component({
  selector: 'app-christmas-tree',
  imports: [AsyncPipe, NgStyle, NgClass],
  templateUrl: './christmas-tree.html',
  styleUrl: './christmas-tree.scss',
})
export class ChristmasTree implements OnInit {
  bg$!: Observable<string>
  tree$!: Observable<string>
  isOnGarland$!: Observable<boolean | null>
  colorGarland$!: Observable<string>
  
  private treeService = inject(TreeService)
  
  ngOnInit(): void {
    this.treeService.getBgs()
    this.bg$ = this.treeService.currentBackground$
    this.treeService.getTrees()
    this.tree$ = this.treeService.currentTree$
    this.isOnGarland$ = this.treeService.isGarlandOn$
    this.colorGarland$ = this.treeService.garlandColor$
  }
  
  //Гирлянды
  colors = ["red", "yellow", "green", "blue", "multi"];
  lights1 = Array.from({ length: 4 }, (_, i) => ({
    on: false,
    left: i * 30
  }));
  lights2 = Array.from({ length: 7 }, (_, i) => ({
    on: false,
    left: i * 30
  }));
  lights3 = Array.from({ length: 10 }, (_, i) => ({
    on: false,
    left: i * 30
  }));
  lights4 = Array.from({ length: 12 }, (_, i) => ({
    on: false,
    left: i * 30
  }));
  lights5 = Array.from({ length: 14 }, (_, i) => ({
    on: false,
    left: i * 30
  }));
  
}
