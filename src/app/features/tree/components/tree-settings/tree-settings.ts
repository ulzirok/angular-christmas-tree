import { Component, inject, OnInit } from '@angular/core';
import { ButtonVolume } from '../../../../shared/components/button-volume/button-volume';
import { ButtonSnow } from '../../../../shared/components/button-snow/button-snow';
import { TreeCard } from '../../../../shared/components/tree-card/tree-card';
import { TreeBg } from '../../../../shared/components/tree-bg/tree-bg';
import { TreeService } from '../../services/tree-service';
import { Observable } from 'rxjs';
import { ITree } from '../../models/tree';
import { AsyncPipe, NgClass } from '@angular/common';
import { IBg } from '../../models/bg';
import { IGarland } from '../../models/garkand';

@Component({
  selector: 'app-tree-settings',
  imports: [ButtonVolume, ButtonSnow, TreeCard, TreeBg, AsyncPipe, NgClass],
  templateUrl: './tree-settings.html',
  styleUrl: './tree-settings.scss',
})
export class TreeSettings implements OnInit {
  trees$!: Observable<ITree[]>;
  bgs$!: Observable<IBg[]>;
  garlands$!: Observable<IGarland[]>;
  audio$!: Observable<boolean>;
  isSnowing$!: Observable<boolean>;

  private treeService = inject(TreeService);

  onChosenTree(valueTree: string) {
    this.treeService.chooseTree(valueTree);
  }

  onBgChosen(valueBg: string) {
    this.treeService.chooseBg(valueBg);
  }

  onSwitch(event: Event) {
    const valueSwitch = (event.target as HTMLInputElement).checked;
    this.treeService.onSwitcherGarland(valueSwitch);
  }

  changeColor(valueColor: string) {
    this.treeService.chooseGarland(valueColor);
  }

  onAudioSwitched() {
    this.treeService.audioSwitcher();
  }

  onSnowSwitched() {
    this.treeService.snowSwitcher();
  }

  ngOnInit(): void {
    this.treeService.getTrees();
    this.trees$ = this.treeService.trees$;

    this.treeService.getBgs();
    this.bgs$ = this.treeService.bgs$;

    this.treeService.getGarlands();
    this.garlands$ = this.treeService.garlands$;

    this.audio$ = this.treeService.isAudioOn$;
    this.isSnowing$ = this.treeService.isSnowOn$;
  }
}
