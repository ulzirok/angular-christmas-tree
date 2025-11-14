import { Component } from '@angular/core';
import { ButtonVolume } from '../../../../shared/components/button-volume/button-volume';
import { ButtonSnow } from '../../../../shared/components/button-snow/button-snow';
import { TreeCard } from '../../../../shared/components/tree-card/tree-card';
import { TreeBg } from '../../../../shared/components/tree-bg/tree-bg';

@Component({
  selector: 'app-tree-settings',
  imports: [ButtonVolume, ButtonSnow, TreeCard, TreeBg],
  templateUrl: './tree-settings.html',
  styleUrl: './tree-settings.scss',
})
export class TreeSettings {}
