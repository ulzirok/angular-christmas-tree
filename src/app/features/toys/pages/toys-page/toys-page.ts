import { Component } from '@angular/core';
import { ToysSettings } from '../../components/toys-settings/toys-settings';
import { ToysList } from '../../components/toys-list/toys-list';
import { ToyCard } from '../../components/toy-card/toy-card';
import { ButtonUp } from '../../../../shared/components/button-up/button-up';

@Component({
  selector: 'app-toys-page',
  imports: [ToysSettings, ToysList, ButtonUp],
  templateUrl: './toys-page.html',
  styleUrl: './toys-page.scss',
})
export class ToysPage {}
