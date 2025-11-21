import { Component } from '@angular/core';
import { TreeSettings } from '../../components/tree-settings/tree-settings';
import { ChristmasTree } from '../../components/christmas-tree/christmas-tree';
import { Favourites } from '../../components/favourites/favourites';

@Component({
  selector: 'app-tree-page',
  imports: [TreeSettings, ChristmasTree, Favourites],
  templateUrl: './tree-page.html',
  styleUrl: './tree-page.scss',
})
export class TreePage { }
